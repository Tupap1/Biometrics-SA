const { spawn } = require('child_process');
const path = require('path');
const waitOn = require('wait-on');
const kill = require('tree-kill');


let frontendProcess = null;
let backendProcess = null;
let electronProcess = null;

// Helper function to handle process errors
function handleProcessError(processName, error) {
    console.error(`${processName} failed to start:`, error);
    cleanup();
    process.exit(1);
}

// Cleanup function to kill all processes
function cleanup() {
    const processes = [frontendProcess, backendProcess, electronProcess];
    processes.forEach(proc => {
        if (proc) {
            kill(proc.pid);
        }
    });
}


process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

async function startAll() {
    try {
        console.log('Starting Flask backend...');
        backendProcess = spawn('cmd.exe', 
            ['/c', 
            'cd biometricssa\\Scripts && ' +
            'activate && ' +
            'cd .. && ' +
            'cd .. && ' +
            'python run.py'
        ], {
            shell: true,
            stdio: 'inherit'
        });

        backendProcess.on('error', (err) => handleProcessError('Backend', err));


        await waitOn({
            resources: ['http://localhost:5000/consultarbiometrias'],
            timeout: 30000
        });


        console.log('Starting Vite frontend...');
        frontendProcess = spawn('npm', ['run', 'dev'], {
            cwd: path.join(process.cwd(), 'Front'),
            shell: true,
            stdio: 'inherit',
            env: { ...process.env, BROWSER: 'none' }
        });

        frontendProcess.on('error', (err) => handleProcessError('Frontend', err));


        await waitOn({
            resources: ['http://localhost:5173'],
            timeout: 30000
        });


        console.log('Starting Electron...');
        electronProcess = spawn('npx', ['electron', '.'], {
            cwd: path.join(process.cwd(), 'Front'),
            shell: true,
            stdio: 'inherit'
        });

        electronProcess.on('error', (err) => handleProcessError('Electron', err));

        // Handle process exits
        const processes = [
            { proc: frontendProcess, name: 'Frontend' },
            { proc: backendProcess, name: 'Backend' },
            { proc: electronProcess, name: 'Electron' }
        ];

        processes.forEach(({ proc, name }) => {
            proc.on('exit', (code) => {
                console.log(`${name} process exited with code ${code}`);
                cleanup();
            });
        });

    } catch (error) {
        console.error('Error during startup:', error);
        cleanup();
        process.exit(1);
    }
}

startAll();
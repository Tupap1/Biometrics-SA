const Entrar = ({ label, onClick, disabled = false, className = '' }) => {
   return (
       <button 
           onClick={onClick} 
           disabled={disabled} 
           className={`btn ${className}`}>
           {label}
       </button>
   );
};

export default Entrar;
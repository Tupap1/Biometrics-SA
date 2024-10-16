"""empty message

Revision ID: b1e18683e0c6
Revises: 77edbae47780
Create Date: 2024-10-17 21:23:59.255904

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'b1e18683e0c6'
down_revision = '77edbae47780'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('estanque', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tamañoEstanque', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('nombreEstanque', sa.String(length=500), nullable=True))
        batch_op.drop_column('capacidad_maxima')
        batch_op.drop_column('tipo')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('estanque', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tipo', mysql.VARCHAR(length=50), nullable=True))
        batch_op.add_column(sa.Column('capacidad_maxima', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
        batch_op.drop_column('nombreEstanque')
        batch_op.drop_column('tamañoEstanque')

    # ### end Alembic commands ###

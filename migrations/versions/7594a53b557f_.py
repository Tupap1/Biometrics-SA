"""empty message

Revision ID: 7594a53b557f
Revises: 3b4d45b1654c
Create Date: 2024-08-21 10:13:21.069086

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7594a53b557f'
down_revision = '3b4d45b1654c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuario', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rol', sa.INTEGER(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuario', schema=None) as batch_op:
        batch_op.drop_column('rol')

    # ### end Alembic commands ###
"""empty message

Revision ID: 77edbae47780
Revises: 0463818862cd
Create Date: 2024-09-30 07:29:52.965243

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '77edbae47780'
down_revision = '0463818862cd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('biometria', schema=None) as batch_op:
        batch_op.alter_column('fecha',
               existing_type=sa.DATE(),
               type_=sa.DateTime(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('biometria', schema=None) as batch_op:
        batch_op.alter_column('fecha',
               existing_type=sa.DateTime(),
               type_=sa.DATE(),
               existing_nullable=True)

    # ### end Alembic commands ###

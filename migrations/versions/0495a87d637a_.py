"""empty message

Revision ID: 0495a87d637a
Revises: 455cd912ad35
Create Date: 2024-10-26 14:48:53.257013

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0495a87d637a'
down_revision = '455cd912ad35'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('alimentacion', schema=None) as batch_op:
        batch_op.add_column(sa.Column('observaciones', sa.String(length=5000), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('alimentacion', schema=None) as batch_op:
        batch_op.drop_column('observaciones')

    # ### end Alembic commands ###

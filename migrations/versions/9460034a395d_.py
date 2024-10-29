"""empty message

Revision ID: 9460034a395d
Revises: 0495a87d637a
Create Date: 2024-10-28 16:18:04.658195

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9460034a395d'
down_revision = '0495a87d637a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('wq', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fecha', sa.Date(), nullable=True))
        batch_op.add_column(sa.Column('hora', sa.Time(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('wq', schema=None) as batch_op:
        batch_op.drop_column('hora')
        batch_op.drop_column('fecha')

    # ### end Alembic commands ###

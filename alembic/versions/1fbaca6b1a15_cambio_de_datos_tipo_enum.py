"""cambio de datos tipo enum

Revision ID: 1fbaca6b1a15
Revises: 
Create Date: 2024-09-23 14:44:31.076656

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1fbaca6b1a15'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass

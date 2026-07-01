from sqlalchemy import text

from app.database import engine


def get_schema():

    query = """
    SELECT
        table_name,
        column_name,
        data_type
    FROM information_schema.columns
    WHERE table_schema='public'
    ORDER BY table_name, ordinal_position;
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query)).fetchall()

    schema = ""

    current = ""

    for table, column, datatype in rows:

        if table != current:

            current = table

            schema += f"\nTable {table}\n"

        schema += f"- {column} ({datatype})\n"

    return schema
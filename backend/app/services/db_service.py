from sqlalchemy import text
from app.database import engine


def execute_query(query: str):
    with engine.connect() as connection:
        result = connection.execute(text(query))

        if result.returns_rows:
            columns = result.keys()
            rows = result.fetchall()

            return {
                "columns": list(columns),
                "rows": [list(row) for row in rows],
            }

        connection.commit()

        return {
            "columns": [],
            "rows": [],
        }
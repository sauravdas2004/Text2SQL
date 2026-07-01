import re


def validate_sql(query: str):
    query = query.strip().lower()

    if not query.startswith("select"):
        raise ValueError("Only SELECT queries are allowed.")

    blocked = [
        "insert",
        "update",
        "delete",
        "drop",
        "alter",
        "truncate",
        "create",
        "grant",
        "revoke",
    ]

    for keyword in blocked:
        if re.search(rf"\b{keyword}\b", query):
            raise ValueError(f"Blocked SQL keyword: {keyword}")

    return True
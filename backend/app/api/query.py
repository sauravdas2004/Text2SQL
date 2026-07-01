from fastapi import APIRouter
from pydantic import BaseModel

from app.services.db_service import execute_query

router = APIRouter()


class QueryRequest(BaseModel):
    query: str


@router.post("/execute")
def execute(request: QueryRequest):
    return execute_query(request.query)
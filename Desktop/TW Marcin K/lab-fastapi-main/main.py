from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class StudentCreateSchema(BaseModel):
    first_name: str | None
    last_name: str | None 


@app.post("/students/")
async def create_student(student: StudentCreateSchema):
    student_data = student.dict()
    return student



@app.get("/")
async def root():
    return {"message": "Hello, World!"}
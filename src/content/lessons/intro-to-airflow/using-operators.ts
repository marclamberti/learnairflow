import { LessonContent } from "@/types/course";

export const lesson: LessonContent = {
  slug: "using-operators",
  title: "Using Operators",
  description: "Explore PythonOperator and other built-in operators",

  instructions: `
# Using Operators

**Operators** are the building blocks of Airflow tasks. Each operator defines a single unit of work.

## Common operators

| Operator | What it does |
|----------|-------------|
| \`BashOperator\` | Runs a bash command |
| \`PythonOperator\` | Runs a Python function |
| \`EmptyOperator\` | Does nothing (useful as a join point) |

## PythonOperator

The \`PythonOperator\` calls a Python function when the task runs:

\`\`\`python
from airflow.operators.python import PythonOperator

def my_function():
    print("Hello from Python!")

task = PythonOperator(
    task_id="python_task",
    python_callable=my_function,
)
\`\`\`

## Instructions

1. Create a DAG with \`dag_id="operators_demo"\`
2. Create a Python function called \`extract_data\` that prints \`"Extracting data..."\`
3. Create a Python function called \`process_data\` that prints \`"Processing data..."\`
4. Create two \`PythonOperator\` tasks using these functions
5. Set \`extract\` to run before \`process\`
  `,

  starterCode: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

# Define your Python functions here

with DAG(
    dag_id="operators_demo",
    start_date=datetime(2024, 1, 1),
    schedule="@daily",
    catchup=False,
) as dag:
    # Create your PythonOperator tasks here
    pass
`,

  solutionCode: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def extract_data():
    print("Extracting data...")

def process_data():
    print("Processing data...")

with DAG(
    dag_id="operators_demo",
    start_date=datetime(2024, 1, 1),
    schedule="@daily",
    catchup=False,
) as dag:
    extract = PythonOperator(
        task_id="extract",
        python_callable=extract_data,
    )
    process = PythonOperator(
        task_id="process",
        python_callable=process_data,
    )

    extract >> process
`,

  mockOutput: `[2024-01-01 00:00:00] INFO - Running DAG: operators_demo
[2024-01-01 00:00:01] INFO - Task extract: Calling extract_data()
Extracting data...
[2024-01-01 00:00:02] INFO - Task process: Calling process_data()
Processing data...
[2024-01-01 00:00:02] INFO - DAG operators_demo completed successfully.`,

  hints: [
    "Define functions before the DAG context manager",
    "Use `python_callable=extract_data` (no parentheses — pass the function, don't call it)",
  ],
};

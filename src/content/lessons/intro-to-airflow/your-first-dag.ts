import { LessonContent } from "@/types/course";

export const lesson: LessonContent = {
  slug: "your-first-dag",
  title: "Your First DAG",
  description: "Create a simple DAG with two tasks",

  instructions: `
# Your First DAG

A **DAG** (Directed Acyclic Graph) is the core concept in Apache Airflow. It defines a workflow — a collection of tasks with dependencies between them.

## What you'll learn

- How to import and create a DAG
- How to add tasks using the \`BashOperator\`
- How to set task dependencies with \`>>\`

## Instructions

1. Create a DAG using the \`with DAG(...) as dag:\` context manager
2. Set the \`dag_id\` to \`"my_first_dag"\`
3. Set a \`start_date\` and \`schedule\`
4. Add two \`BashOperator\` tasks
5. Set \`task1\` to run before \`task2\` using \`>>\`

### Example

\`\`\`python
task = BashOperator(
    task_id="say_hello",
    bash_command="echo Hello!",
)
\`\`\`
  `,

  starterCode: `from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

# Create your DAG here
`,

  solutionCode: `from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

with DAG(
    dag_id="my_first_dag",
    start_date=datetime(2024, 1, 1),
    schedule="@daily",
    catchup=False,
) as dag:
    task1 = BashOperator(
        task_id="say_hello",
        bash_command="echo Hello from Task 1!",
    )
    task2 = BashOperator(
        task_id="say_goodbye",
        bash_command="echo Goodbye from Task 2!",
    )
    task1 >> task2
`,

  mockOutput: `[2024-01-01 00:00:00] INFO - Running DAG: my_first_dag
[2024-01-01 00:00:01] INFO - Task say_hello: echo Hello from Task 1!
Hello from Task 1!
[2024-01-01 00:00:02] INFO - Task say_goodbye: echo Goodbye from Task 2!
Goodbye from Task 2!
[2024-01-01 00:00:02] INFO - DAG my_first_dag completed successfully.`,

  hints: [
    "Use the `with DAG(...) as dag:` context manager pattern",
    "Don't forget to set dependencies with `>>` at the end",
  ],
};

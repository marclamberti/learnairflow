import { LessonContent } from "@/types/course";

export const lesson: LessonContent = {
  slug: "task-dependencies",
  title: "Task Dependencies",
  description: "Learn how to chain and fan out tasks",

  instructions: `
# Task Dependencies

In Airflow, you control the **order** tasks run by setting dependencies between them.

## Dependency operators

| Operator | Meaning |
|----------|---------|
| \`>>\` | "runs before" (downstream) |
| \`<<\` | "runs after" (upstream) |

## Patterns

### Chain (sequential)
\`\`\`python
task1 >> task2 >> task3
\`\`\`

### Fan-out (one to many)
\`\`\`python
task1 >> [task2, task3]
\`\`\`

### Fan-in (many to one)
\`\`\`python
[task1, task2] >> task3
\`\`\`

## Instructions

1. Create a DAG with \`dag_id="dependency_demo"\`
2. Create 4 \`BashOperator\` tasks: \`start\`, \`branch_a\`, \`branch_b\`, \`end\`
3. Set dependencies so that:
   - \`start\` fans out to \`branch_a\` and \`branch_b\`
   - Both branches fan in to \`end\`
  `,

  starterCode: `from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

with DAG(
    dag_id="dependency_demo",
    start_date=datetime(2024, 1, 1),
    schedule="@daily",
    catchup=False,
) as dag:
    # Create your tasks and set dependencies here
    pass
`,

  solutionCode: `from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

with DAG(
    dag_id="dependency_demo",
    start_date=datetime(2024, 1, 1),
    schedule="@daily",
    catchup=False,
) as dag:
    start = BashOperator(
        task_id="start",
        bash_command="echo Starting pipeline",
    )
    branch_a = BashOperator(
        task_id="branch_a",
        bash_command="echo Running branch A",
    )
    branch_b = BashOperator(
        task_id="branch_b",
        bash_command="echo Running branch B",
    )
    end = BashOperator(
        task_id="end",
        bash_command="echo Pipeline complete",
    )

    start >> [branch_a, branch_b] >> end
`,

  mockOutput: `[2024-01-01 00:00:00] INFO - Running DAG: dependency_demo
[2024-01-01 00:00:01] INFO - Task start: echo Starting pipeline
Starting pipeline
[2024-01-01 00:00:02] INFO - Task branch_a: echo Running branch A
Running branch A
[2024-01-01 00:00:02] INFO - Task branch_b: echo Running branch B
Running branch B
[2024-01-01 00:00:03] INFO - Task end: echo Pipeline complete
Pipeline complete
[2024-01-01 00:00:03] INFO - DAG dependency_demo completed successfully.`,

  hints: [
    "Use `start >> [branch_a, branch_b]` to fan out",
    "Use `[branch_a, branch_b] >> end` to fan in",
    "You can chain both on one line: `start >> [branch_a, branch_b] >> end`",
  ],
};

# Week 4 — Postgres and RDS

To avoid AWS service cost I will use the AWS account of my company. I will try to keep two different AWS account, splitting services based on free or cost one.

For this reason I couldn’t setup in an easy way the security group rules automatic update. 
I’ll try to figure out how to use 2 different AWS account in the same workspace 🙂

Going thought the course I’ve found out that is nearly impossible to continue with 2 account (for example for the VPC constraint related of RDS and Lambda. I switched back to a single aws account. To decrease the bill I’ve added several script into gitpod.yaml file to turn on and off the RDS DB automatically.

I’ve directly used the AWS CLI to execute different aws cli commands.
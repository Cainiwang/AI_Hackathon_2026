# BNZ Interest Rate Simulation Tool
<sub>This project was developed by Team Artisans Intelligence. AI tools were used to assist with coding, debugging, and report generation, but the project idea, system design, implementation decisions, testing, and final submission were completed and reviewed by the team.</sub>

This is an Interest Rate Simulation Tool develop for BNZ x AWS hackathon

This tool helps BNZ staff to estimate the impact of changing loan/saving interest.
Users can enter the input data:
- Current OCR rate
- Current Bank interest rate
- Target interest rate
- Current customer numnbers
- Average account balance
Our tool will generate an AI-supported analysis report that contains estimate customer lost, revenue lost and risks alert.

## Project Overview

When the Reserve Bank of New Zealand choose to changes the Offical Cash Rate (OCR) banks (eg. BNZ) needs to decide how much that change should be passed on to customers.
This decision may affect the following parameters:
- Bank Revenue
- Customer retension
- Customer acquisition
- Competitiveness

Our project design a simple interface that helps bank staff to simulate a proposed interest rate change and receive a structured report containing estimated impacts, risks, and recommendations.

## Key Feature
- Simulate Loan interest rate change
- Simulate Saving interest rate change
- Estimate annual revenue changes of bank
- Generate an AI-supported recommendation
- Display warnings and assumptions
- Export the generated report as a PDF

## How it Works
1. Users login into our tools
2. Choose either Loan interest rate simulation or Saving interest rate simulation
3. Enter required data
4. The frontend will send inputs to the Springboot backend
5. Backend send system prompt and user prompt to AWS bedrock AI
6. The AI-generated report is returned to the frontend.
7. The user can view or export the report as a PDF.

## System Architecture

```text
React Frontend
      |
      | HTTP / JSON
      v
Spring Boot Backend
      |
      | AWS SDK
      v
AWS Bedrock AI Model
      |
      v
Simulation Report

```
## Technology Stack
### Frontend
React
JavaScript
Vite
CSS
jsPDF
### Backend
Java
Spring Boot
Maven
REST API
AWS SDK for Java
### Cloud and AI
AWS Bedrock
Amazon Nova Lite
### Development Tools
Visual Studio Code
Git
GitHub

## Prerequisites

Install the following software:
- Java 17 or later
- Maven
- Node.js
- npm
- Git
- An AWS account or AWS Academy Sandbox with Bedrock access

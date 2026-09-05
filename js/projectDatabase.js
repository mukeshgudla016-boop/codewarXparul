/* ==========================================================================
   AI Project Mentor - Comprehensive Project Database & Templates
   ========================================================================== */

export const PROJECT_TEMPLATES = [
  {
    id: 'proj_ai_medical_diagnosis',
    title: 'MedAssist AI: Intelligent Clinical Decision Support & Medical Scan Analyzer',
    domain: 'Artificial Intelligence & ML',
    branches: ['Computer Science & Engineering', 'Artificial Intelligence & Data Science'],
    shortDescription: 'A multi-modal AI platform for medical image classification (X-Ray/MRI) and patient symptom analysis with actionable doctor summary reports.',
    problemStatement: 'Rural clinics and understaffed emergency departments face severe backlogs in radiological evaluation, leading to delayed medical interventions and diagnostic errors.',
    whyMatches: 'Perfectly aligns with your interest in Healthcare AI and PyTorch skills. Leverages deep learning models while wrapping them in an intuitive full-stack web UI.',
    difficulty: 'Advanced',
    recommendedTechStack: {
      frontend: 'React.js, Tailwind CSS, Chart.js, Lucide Icons',
      backend: 'Python FastAPI / Node.js, Celery, Redis',
      database: 'PostgreSQL (Patient Records), AWS S3 / MinIO (DICOM Scans)',
      aiML: 'PyTorch, Torchvision (ResNet-50 / DenseNet), Hugging Face Transformers (Med-BERT for clinical text parsing)',
      deployment: 'Docker, Vercel (Frontend), Render / AWS EC2 (GPU Engine)'
    },
    mainFeatures: [
      'Multi-modal DICOM/PNG X-Ray & MRI scan upload with visual Grad-CAM heatmap explainability',
      'AI-powered clinical triage scoring (Urgent, Moderate, Routine)',
      'Automated patient diagnostic report generator with exportable PDF summaries',
      'Doctor feedback loop & ground-truth validation interface',
      'Interactive symptom checker questionnaire powered by clinical NLP model'
    ],
    aiComponents: 'ResNet50 CNN fine-tuned on ChestX-ray14 dataset + Grad-CAM visualization layer for model explainability.',
    estimatedDuration: '3 - 4 Months',
    matchScore: 96,

    // Detailed Blueprint
    blueprint: {
      objectives: [
        'Achieve >92% sensitivity on key pulmonary disease detection from chest radiographs.',
        'Provide transparent visual explainability (Grad-CAM heatmaps) so medical staff understand AI decisions.',
        'Deliver sub-2-second inference latency for real-time triage processing.'
      ],
      functionalRequirements: [
        'Secure patient profile management with HIPAA-compliant data encryption.',
        'Drag-and-drop DICOM/JPEG medical image upload pipeline.',
        'Real-time inference queue with status updates via WebSockets.',
        'PDF report export with annotated bounding boxes and heatmaps.'
      ],
      modules: [
        { name: 'Auth & User Management', desc: 'JWT-based access control with Doctor, Radiologist, and Administrator roles.' },
        { name: 'Image Processing & Inference Pipeline', desc: 'FastAPI service running PyTorch models, normalization, and Grad-CAM generation.' },
        { name: 'Clinical Dashboard', desc: 'React-driven interactive UI displaying patient history, confidence metrics, and heatmaps.' },
        { name: 'Report Export & Audit Engine', desc: 'Generates formal medical summary documents with doctor e-signatures.' }
      ],
      databaseSchema: [
        { table: 'users', fields: 'id, email, password_hash, role, full_name, created_at' },
        { table: 'patients', fields: 'id, mrn_number, age, gender, medical_history' },
        { table: 'scans', fields: 'id, patient_id, image_url, scan_type, uploaded_at' },
        { table: 'predictions', fields: 'id, scan_id, primary_condition, confidence, heatmap_url, reviewed_by_doctor' }
      ],
      apiSpecs: [
        { method: 'POST', endpoint: '/api/v1/auth/login', purpose: 'Authenticate doctor/user and return JWT token' },
        { method: 'POST', endpoint: '/api/v1/scans/analyze', purpose: 'Upload medical image file & trigger PyTorch inference pipeline' },
        { method: 'GET', endpoint: '/api/v1/scans/:id/report', purpose: 'Fetch completed diagnostic report with Grad-CAM image overlay' },
        { method: 'POST', endpoint: '/api/v1/scans/:id/feedback', purpose: 'Submit doctor validation or corrections to refine model' }
      ],
      systemArchitecture: {
        flow: [
          'Client React SPA -> REST API (FastAPI Gateway)',
          'FastAPI Gateway -> Redis Queue -> Celery Worker (GPU Inferences)',
          'PyTorch Engine -> Generates Heatmap Image -> Save to S3 Bucket',
          'Database -> Write Prediction Metadata -> Emit WebSocket Notification to Client'
        ]
      },
      vivaTips: [
        'Be prepared to explain why accuracy alone is insufficient in medical AI (explain Precision, Recall, and F1-score).',
        'Demonstrate how Grad-CAM works by calculating gradients of the target concept with respect to feature maps of the final convolutional layer.',
        'Highlight data privacy regulations (HIPAA compliance, de-identification of DICOM metadata).'
      ],
      testingSuggestions: [
        'Unit test DICOM preprocessing pipeline for invalid pixel array bounds.',
        'Perform load testing on FastAPI endpoints with Locust to handle concurrent image uploads.',
        'Cross-validate CNN model accuracy using K-Fold cross validation on unseen clinical datasets.'
      ],
      deploymentSuggestions: [
        'Containerize FastAPI & PyTorch worker with Docker Compose.',
        'Host web frontend on Vercel or Cloudflare Pages.',
        'Deploy PyTorch backend model on GPU-enabled instances (e.g. AWS g4dn or Render Web Service).'
      ]
    },

    // Interactive Roadmap
    roadmap: [
      {
        phaseId: 'phase_1',
        title: 'Phase 1: Environment Setup & Data Pipeline',
        duration: 'Weeks 1 - 2',
        tasks: [
          { id: 't1_1', label: 'Setup GitHub repository, Python virtual environment, and FastAPI skeleton', codeSnippet: 'python -m venv venv && source venv/bin/activate\npip install fastapi uvicorn torch torchvision pillow', completed: true },
          { id: 't1_2', label: 'Download NIH ChestX-ray14 or COVID-19 Radiography Dataset', codeSnippet: 'kaggle datasets download -d taows/chest-xray-pneumonia', completed: true },
          { id: 't1_3', label: 'Build PyTorch DataLoaders with image augmentation (rotation, normalization)', completed: false }
        ]
      },
      {
        phaseId: 'phase_2',
        title: 'Phase 2: Model Training & Grad-CAM Explainability',
        duration: 'Weeks 3 - 5',
        tasks: [
          { id: 't2_1', label: 'Fine-tune ResNet-50 transfer learning model on target classes', completed: false },
          { id: 't2_2', label: 'Implement Grad-CAM module to extract feature map activations', completed: false },
          { id: 't2_3', label: 'Evaluate model performance (ROC-AUC curves, Confusion Matrix)', completed: false }
        ]
      },
      {
        phaseId: 'phase_3',
        title: 'Phase 3: Backend API & Frontend Dashboard',
        duration: 'Weeks 6 - 8',
        tasks: [
          { id: 't3_1', label: 'Build FastAPI endpoints for upload, async background worker, and reporting', completed: false },
          { id: 't3_2', label: 'Develop React full-stack dashboard with scan preview & heatmap comparison toggle', completed: false },
          { id: 't3_3', label: 'Integrate PDF report generator using jsPDF / pdfkit', completed: false }
        ]
      },
      {
        phaseId: 'phase_4',
        title: 'Phase 4: Testing, Viva Demo & Deployment',
        duration: 'Weeks 9 - 10',
        tasks: [
          { id: 't4_1', label: 'Containerize backend service using Docker', completed: false },
          { id: 't4_2', label: 'Draft Viva Presentation deck & record demo video', completed: false }
        ]
      }
    ]
  },

  {
    id: 'proj_smart_campus_iot',
    title: 'IoT EcoPulse: Smart Campus Energy & Indoor Air Quality Monitoring System',
    domain: 'Internet of Things (IoT)',
    branches: ['Electronics & Communication', 'Computer Science & Engineering'],
    shortDescription: 'An end-to-end IoT platform utilizing ESP32 microcontrollers, MQTT messaging, and a real-time web dashboard to monitor and optimize campus power consumption.',
    problemStatement: 'Educational institutions waste up to 35% of electrical energy due to unoccupied air-conditioned rooms, unmonitored equipment, and lack of real-time telemetry.',
    whyMatches: 'Directly aligns with your interest in IoT and hardware programming. Connects microcontroller sensor telemetry with modern web charts and alert notifications.',
    difficulty: 'Practical MVP',
    recommendedTechStack: {
      frontend: 'React.js / HTML5, Chart.js, WebSockets, Lucide Icons',
      backend: 'Node.js, Express.js, Mosquitto MQTT Broker',
      database: 'InfluxDB (Time-series sensor telemetry), MongoDB (Device registry)',
      aiML: 'Microcontroller C++, ESP32 Wi-Fi stack, DHT22/MQ-135 Sensors',
      deployment: 'Raspberry Pi / AWS EC2 for Broker & Node server'
    },
    mainFeatures: [
      'Real-time ambient temperature, humidity, CO2, and energy current sensing via ESP32 nodes',
      'MQTT pub-sub protocol for lightweight, low-latency telemetry streaming',
      'Interactive floorplan heatmap showing energy consumption zones',
      'Automated relay control triggers (shut down lights/AC when room is unoccupied >15 mins)',
      'Telegram/WhatsApp alert bot for abnormal power surges or toxic gas detection'
    ],
    aiComponents: 'Rule-based anomaly detection algorithm + predictive peak usage forecasting using linear regression.',
    estimatedDuration: '2 - 3 Months',
    matchScore: 94,

    blueprint: {
      objectives: [
        'Reduce unnecessary campus energy consumption by at least 20%.',
        'Maintain real-time sensor data latency under 500ms over Wi-Fi/MQTT.',
        'Provide automated equipment cutoff switches based on PIR occupancy detection.'
      ],
      functionalRequirements: [
        'ESP32 wireless node broadcasting telemetry every 5 seconds over MQTT.',
        'Time-series data storage for historical analytics and daily usage charts.',
        'Manual override switch on web UI to toggle physical relays remotely.',
        'Threshold alert management system with configurable push notifications.'
      ],
      modules: [
        { name: 'Hardware Firmware (ESP32)', desc: 'C++ code for reading DHT22, ACS712 current sensors, PIR sensor, and publishing JSON payloads over MQTT.' },
        { name: 'MQTT Broker & Node Ingestion Core', desc: 'Eclipse Mosquitto broker paired with Node.js service for parsing and storing metric streams.' },
        { name: 'Web Analytics Dashboard', desc: 'Real-time dashboard built with Chart.js displaying live gauge charts, graphs, and floor map status.' },
        { name: 'Automation Engine', desc: 'Rules engine executing relay activation when thresholds or occupancy timers trigger.' }
      ],
      databaseSchema: [
        { table: 'devices', fields: 'device_id, location, status, ip_address, installed_at' },
        { table: 'telemetry_logs', fields: 'timestamp, device_id, temperature, humidity, co2_ppm, current_amps, power_watts' },
        { table: 'automation_rules', fields: 'rule_id, device_id, condition, action, enabled' }
      ],
      apiSpecs: [
        { method: 'GET', endpoint: '/api/v1/devices', purpose: 'Retrieve all registered IoT sensor nodes and active status' },
        { method: 'GET', endpoint: '/api/v1/telemetry/live', purpose: 'Fetch real-time sensor metrics for specific node' },
        { method: 'POST', endpoint: '/api/v1/devices/:id/relay', purpose: 'Send remote relay toggle command to ESP32' }
      ],
      systemArchitecture: {
        flow: [
          'ESP32 Hardware Sensors -> Wi-Fi -> MQTT Broker (Eclipse Mosquitto)',
          'Mosquitto Broker -> Node.js MQTT Subscriber Service',
          'Node.js Service -> InfluxDB Time-Series Engine + Socket.IO Server',
          'Socket.IO Server -> React Dashboard (Real-time Gauge Updating)'
        ]
      },
      vivaTips: [
        'Explain why MQTT is superior to HTTP REST for battery-constrained IoT devices (overhead, persistent connection, pub-sub model).',
        'Demonstrate circuit connection safety precautions (opto-isolated relays, voltage dividers for ESP32 3.3V logic).',
        'Be ready to discuss time-series database indexing vs traditional relational databases.'
      ],
      testingSuggestions: [
        'Simulate network packet loss to verify ESP32 Wi-Fi auto-reconnect routine.',
        'Perform stress testing by firing 100 mock MQTT publishing clients simultaneously using Mosquitto_pub.',
        'Verify hardware relay switching speeds under load.'
      ],
      deploymentSuggestions: [
        'Host MQTT broker and Node.js ingestion engine on a local Raspberry Pi 4 or cheap cloud VPS.',
        'Build custom PCB or breadboard prototype enclosed in 3D-printed housing.'
      ]
    },

    roadmap: [
      {
        phaseId: 'phase_1',
        title: 'Phase 1: Hardware Assembly & Circuit Wireup',
        duration: 'Weeks 1 - 2',
        tasks: [
          { id: 't1_1', label: 'Wire ESP32 microcontroller with DHT22, ACS712, PIR, and Relay module', codeSnippet: '#include <WiFi.h>\n#include <PubSubClient.h>\n// ESP32 MQTT Setup', completed: true },
          { id: 't1_2', label: 'Write C++ Arduino firmware for Wi-Fi connection and sensor reading', completed: false }
        ]
      },
      {
        phaseId: 'phase_2',
        title: 'Phase 2: MQTT Broker & Database Setup',
        duration: 'Weeks 3 - 4',
        tasks: [
          { id: 't2_1', label: 'Install Eclipse Mosquitto broker and configure authentication', completed: false },
          { id: 't2_2', label: 'Set up InfluxDB database and Node.js ingestion backend', completed: false }
        ]
      },
      {
        phaseId: 'phase_3',
        title: 'Phase 3: Web Dashboard & Automation Rules',
        duration: 'Weeks 5 - 6',
        tasks: [
          { id: 't3_1', label: 'Build web dashboard with live Chart.js real-time graphing', completed: false },
          { id: 't3_2', label: 'Implement remote relay toggle control from web interface', completed: false }
        ]
      }
    ]
  },

  {
    id: 'proj_devops_cloud_sec',
    title: 'CloudGuard AI: Automated Infrastructure Security Compliance & Vulnerability Audit',
    domain: 'Cybersecurity & Cloud',
    branches: ['Information Technology', 'Computer Science & Engineering'],
    shortDescription: 'A cloud security platform that scans AWS/Docker environments for misconfigurations, open ports, and vulnerable container packages with AI-assisted remediation scripts.',
    problemStatement: 'Cloud breaches frequently result from simple misconfigurations such as exposed S3 buckets, open SSH ports, and unpatched base container images.',
    whyMatches: 'Aligns with your interest in DevOps, Docker, and Security. Combines automated security auditing with AI-assisted bash/terraform fix generation.',
    difficulty: 'Industry Standard',
    recommendedTechStack: {
      frontend: 'React.js, Tailwind CSS, Lucide Icons',
      backend: 'Go (Golang) / Python, Docker SDK, Trivy Scanner API',
      database: 'PostgreSQL (Audit findings), Redis (Task Queue)',
      aiML: 'OpenAI GPT-4o / Gemini API for generating automated Terraform remediation fixes',
      deployment: 'Docker Containers, Kubernetes Helm Chart, AWS / Vercel'
    },
    mainFeatures: [
      'One-click automated scan of Docker Hub images & AWS infrastructure templates',
      'CVE risk ranking engine (Critical, High, Medium, Low)',
      'AI Remediation Generator: Produces corrected Dockerfile or Terraform patches automatically',
      'Compliance benchmarking (CIS AWS Benchmark & OWASP Top 10 for Containers)',
      'Slack/Teams webhook integration for immediate security alert broadcasting'
    ],
    aiComponents: 'LLM prompt engine tuned for Infrastructure as Code (IaC) bug detection and patch synthesis.',
    estimatedDuration: '3 Months',
    matchScore: 92,

    blueprint: {
      objectives: [
        'Automate security audits reducing manual inspection time from hours to under 30 seconds.',
        'Identify 100% of critical CVE vulnerabilities in target container layers.',
        'Generate syntactically valid Terraform / Dockerfile patch files automatically.'
      ],
      functionalRequirements: [
        'Secure authentication with API token generation.',
        'Integration with Docker daemon socket for local container inspection.',
        'Dashboard view showing security posture score (0 to 100).',
        'One-click download of auto-generated security patch files.'
      ],
      modules: [
        { name: 'Scanner Core Engine', desc: 'Wraps Trivy & Nmap scanners to execute container image layer analysis and port probes.' },
        { name: 'AI Patch Synthesizer', desc: 'Feeds vulnerability metadata into LLM API to generate copy-pasteable configuration fixes.' },
        { name: 'Compliance Dashboard', desc: 'UI for viewing severity charts, vulnerability breakdown, and history.' }
      ],
      databaseSchema: [
        { table: 'scans', fields: 'id, target_name, scan_type, status, vulnerability_count, score, created_at' },
        { table: 'vulnerabilities', fields: 'id, scan_id, cve_id, severity, package_name, installed_version, fixed_version, ai_remediation_code' }
      ],
      apiSpecs: [
        { method: 'POST', endpoint: '/api/v1/scan/container', purpose: 'Trigger vulnerability scan for target Docker image tag' },
        { method: 'GET', endpoint: '/api/v1/scan/:id/remediation', purpose: 'Retrieve AI-generated fix snippet for detected CVEs' }
      ],
      systemArchitecture: {
        flow: [
          'User enters Docker Image Tag -> Go Scanner API Trigger',
          'Go API -> Executes Trivy CLI Scan -> Formats Vulnerability JSON',
          'Vulnerability Metadata -> Sent to AI Service -> AI Synthesizes Clean Dockerfile Patch',
          'Result -> Saved to PostgreSQL -> Rendered on Dashboard'
        ]
      },
      vivaTips: [
        'Explain the difference between static application security testing (SAST) and container image layer scanning.',
        'Demonstrate how Docker multi-stage builds reduce attack surface area.',
        'Discuss Common Vulnerability Scoring System (CVSS v3.1) metrics.'
      ],
      testingSuggestions: [
        'Test against intentionally vulnerable container images (e.g. vulnerable node:10-alpine images).',
        'Verify JSON output schema validation across varying Trivy CLI versions.'
      ],
      deploymentSuggestions: [
        'Package application into single docker-compose.yml file.',
        'Host on cloud instance with Docker socket mounted in read-only mode.'
      ]
    },

    roadmap: [
      {
        phaseId: 'phase_1',
        title: 'Phase 1: CLI Scanner Setup & Wrapper',
        duration: 'Weeks 1 - 3',
        tasks: [
          { id: 't1_1', label: 'Integrate Trivy vulnerability scanner CLI into Go/Python backend wrapper', completed: true },
          { id: 't1_2', label: 'Parse CVE JSON output into structured data models', completed: false }
        ]
      },
      {
        phaseId: 'phase_2',
        title: 'Phase 2: AI Remediation Integration',
        duration: 'Weeks 4 - 6',
        tasks: [
          { id: 't2_1', label: 'Design prompt templates for generating Dockerfile & Terraform security patches', completed: false },
          { id: 't2_2', label: 'Build React UI for side-by-side vulnerable vs fixed file diff view', completed: false }
        ]
      }
    ]
  },

  {
    id: 'proj_smart_hire_ats',
    title: 'TalentPulse: AI Resume Parser, Skill Matcher & Mock Viva Interview Simulator',
    domain: 'Full Stack Web Apps & AI',
    branches: ['Computer Science & Engineering', 'Information Technology'],
    shortDescription: 'An AI-powered recruitment platform that extracts candidate skills from PDF resumes, calculates job suitability, and conducts interactive voice/text technical mock interviews.',
    problemStatement: 'Job applicants lack immediate feedback on why their resumes fail ATS filters, while recruiters spend hundreds of hours manually screening unqualified applications.',
    whyMatches: 'Combines full-stack web development (React, Node) with practical AI NLP parsing. Extremely relevant for college students preparing for campus placements.',
    difficulty: 'Industry Standard',
    recommendedTechStack: {
      frontend: 'React.js, Tailwind CSS, Web Speech API, PDF.js',
      backend: 'Node.js / Express, Python PyPDF2, LangChain',
      database: 'MongoDB / PostgreSQL, Vector DB (ChromaDB / Pinecone)',
      aiML: 'OpenAI GPT-4o / Gemini API + Sentence Transformers for Semantic Embeddings',
      deployment: 'Vercel + Render / AWS App Runner'
    },
    mainFeatures: [
      'Instant PDF resume parsing & automatic extraction of skills, experience, and education',
      'Semantic Match Score calculation against specific job description postings',
      'Missing skill gap analysis with recommended learning roadmaps',
      'Interactive AI Mock Viva / Interview Simulator with real-time feedback on answers',
      'Recruiter candidate shortlisting dashboard with filtering tags'
    ],
    aiComponents: 'Embedding similarity calculations (Cosine similarity) + LLM conversational interview persona.',
    estimatedDuration: '2 - 3 Months',
    matchScore: 95,

    blueprint: {
      objectives: [
        'Extract candidate contact info and skill keywords with >90% precision from unformatted PDFs.',
        'Calculate semantic relevance score beyond simple keyword matching using vector embeddings.',
        'Deliver interactive 5-question mock technical interview session with dynamic follow-up questions.'
      ],
      functionalRequirements: [
        'Drag-and-drop resume PDF uploader with live preview.',
        'Job description pasting box with custom weight tweaking (Skills vs Experience).',
        'Interactive AI chat panel for mock interview session with speech-to-text input option.'
      ],
      modules: [
        { name: 'PDF Parser Engine', desc: 'Extracts raw text from uploaded PDF resume documents using PyPDF2 / pdf-parse.' },
        { name: 'Semantic Embeddings Matcher', desc: 'Computes vector similarity between resume content and job requirements.' },
        { name: 'Interview Simulator', desc: 'Maintains stateful LLM session playing the role of a technical examiner.' }
      ],
      databaseSchema: [
        { table: 'candidates', fields: 'id, name, email, skills_array, experience_years, parsed_resume_json' },
        { table: 'job_postings', fields: 'id, title, company, required_skills, min_experience, raw_description' },
        { table: 'applications', fields: 'id, candidate_id, job_id, match_percentage, missing_skills, interview_feedback' }
      ],
      apiSpecs: [
        { method: 'POST', endpoint: '/api/v1/resume/parse', purpose: 'Upload PDF file and return extracted skills & summary JSON' },
        { method: 'POST', endpoint: '/api/v1/match/score', purpose: 'Compute match percentage between candidate resume and job posting' },
        { method: 'POST', endpoint: '/api/v1/interview/question', purpose: 'Send user answer and retrieve AI feedback & next follow-up question' }
      ],
      systemArchitecture: {
        flow: [
          'Candidate uploads PDF -> Node backend receives file -> PDF parser extracts text',
          'Extracted text + Job Description -> Sent to Embeddings Service (Cosine Similarity calculated)',
          'Match Results + Missing Skills -> Displayed on Dashboard',
          'Mock Interview Initiated -> AI Interviewer generates contextual questions based on resume gaps'
        ]
      },
      vivaTips: [
        'Explain why vector embeddings (cosine similarity) outperform plain string matching (handling synonyms like "JS" vs "JavaScript").',
        'Be ready to demonstrate PDF parsing edge cases (two-column layouts, tables, scanned images).',
        'Discuss prompt engineering techniques used to keep the AI interviewer grounded.'
      ],
      testingSuggestions: [
        'Test resume parser against 20+ varied resume templates (single column, two column, visual graphics).',
        'Measure API latency for vector embedding generation.'
      ],
      deploymentSuggestions: [
        'Deploy React frontend on Vercel.',
        'Deploy Node.js backend on Render or AWS Elastic Beanstalk.'
      ]
    },

    roadmap: [
      {
        phaseId: 'phase_1',
        title: 'Phase 1: Resume PDF Parser',
        duration: 'Weeks 1 - 2',
        tasks: [
          { id: 't1_1', label: 'Build Node.js file upload route with pdf-parse library integration', completed: true },
          { id: 't1_2', label: 'Implement regex & NLP keyword extraction for programming languages & frameworks', completed: true }
        ]
      },
      {
        phaseId: 'phase_2',
        title: 'Phase 2: Semantic Match Engine',
        duration: 'Weeks 3 - 4',
        tasks: [
          { id: 't2_1', label: 'Connect vector similarity model for computing match percentages', completed: false },
          { id: 't2_2', label: 'Build UI breakdown showing Matched Skills vs Missing Requirements', completed: false }
        ]
      },
      {
        phaseId: 'phase_3',
        title: 'Phase 3: AI Interviewer Chat & Viva Prep',
        duration: 'Weeks 5 - 6',
        tasks: [
          { id: 't3_1', label: 'Implement stateful conversational interview engine', completed: false },
          { id: 't3_2', label: 'Add Web Speech API speech-to-text input capability', completed: false }
        ]
      }
    ]
  }
];

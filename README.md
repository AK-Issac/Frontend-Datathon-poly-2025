# 🐍 S3-erpent  
### Datathon 2025 — PolyFinances  

![Next.js](https://img.shields.io/badge/Frontend-Next.js-blue?logo=nextdotjs)
![Flask](https://img.shields.io/badge/Backend-Flask-lightgrey?logo=flask)
![AWS](https://img.shields.io/badge/Cloud-AWS-orange?logo=amazonaws)
![Hackathon](https://img.shields.io/badge/Projet-Datathon%202025%20PolyFinances-success?logo=hackclub)
![License](https://img.shields.io/badge/Licence-MIT-green)

---

> **Analyse automatisée de rapports financiers et législatifs à l’aide d’une architecture AWS intégrée — avec recommandations et chatbot contextuel.**

---

### 🔗 Liens  
- 🎥 [Vidéo de démonstration](#)  
- 💻 [Devpost](#)  
- 🌐 [Déploiement en ligne](#)  

---

### 🧠 Aperçu du projet  

**S3-erpent** est une plateforme entièrement bâtie sur AWS qui permet d’analyser automatiquement de volumineux documents financiers ou législatifs — tels que des rapports SEC, des formulaires K10 ou des projets de loi — afin d’évaluer leur **impact potentiel sur un portefeuille boursier** (ex. le S&P 500).  

Notre solution transforme ces documents complexes en **indicateurs de risque clairs**, fournit des **recommandations de rééquilibrage**, et permet même à l’utilisateur de **dialoguer avec ses données** grâce à un agent conversationnel alimenté par une base de connaissances AWS.

---

### 🚀 Fonctionnalités principales  

- 📄 **Téléversement intelligent de documents** : supporte les fichiers financiers et législatifs volumineux.  
- ⚙️ **Pipeline AWS automatisé** : nettoyage, segmentation et traitement parallèle orchestrés via Step Functions.  
- 📊 **Analyse d’impact et de risque** : identifie les secteurs les plus exposés et suggère des ajustements de pondération.  
- 💬 **Chatbot RAG** : permet d’interagir directement avec les rapports et le portefeuille, en langage naturel.  
- 🧾 **Rapports exécutifs** : résumés clairs présentant les risques, métriques clés et estimations financières.  

---

### 🧩 Technologies utilisées  

**Frontend :** Next.js  
**Backend :** Flask  
**Cloud & Infrastructure :**  
AWS Lambda · Amazon S3 · Step Functions · DynamoDB · Elastic Beanstalk · Amazon Bedrock (LLMs + Agent Core) · IAM · AWS Knowledge Bases  
*(Architecture 100 % serverless et cloud-native)*

---

### ⚙️ Fonctionnement du système  

1. **Téléversement du fichier**  
   - L’utilisateur charge un document (rapport financier, projet de loi, etc.).  
   - Le fichier est stocké dans **Amazon S3**, ce qui déclenche une fonction Lambda.  

2. **Nettoyage et segmentation**  
   - Le document est normalisé et découpé en **fragments** pour permettre un traitement parallèle.  

3. **Orchestration Step Functions**  
   - Une **machine d’états** gère cinq étapes principales :  
     1. Lister les fragments disponibles.  
     2. Lancer en parallèle une analyse LLM pour chaque fragment (extraction d’impacts, métriques, risques).  
     3. Agréger les résultats pour former un rapport complet.  
     4. Générer un résumé concis et filtré.  
     5. Comparer les données avec le portefeuille enregistré dans **DynamoDB** et produire des recommandations.  

4. **Génération d’insights**  
   - LLM produit un résumé lisible par l’humain : zones de risque, impact financier, conseils stratégiques, etc.  

5. **Intégration à la base de connaissances**  
   - Les rapports finaux sont synchronisés avec une **AWS Knowledge Base**.  
   - Un **chatbot RAG** permet d’interroger les données :  
     > “Quels titres sont les plus affectés par cette réglementation ?”  

---

### 🧑‍💻 Équipe  

**Équipe #28 — Datathon 2025 PolyFinances**  
- **Alexander Meriakri** — Développement Full Stack & Déploiement  
- **Ayoub Khial** — Développement Full Stack & Déploiement  
- **Leroy Tiojip** — Contribution au module RAG (recherche et documentation)  
- **William Dunwoody** — Responsable Infrastructure AWS (Lambdas, Step Functions, Buckets, DynamoDB, Knowledge Base, State Machine)

---

### 🏆 Contexte du Datathon  

Créé dans le cadre du **Datathon 2025 PolyFinances**, ce projet se distingue par :  
- Une **intégration complète à l’écosystème AWS**, utilisant Bedrock Agents, Step Functions et DynamoDB.  
- Une approche **hybride** : génération d’insights immédiats **et** exploration conversationnelle des données historiques.

---

### 🌟 Pistes d’amélioration  

- 📈 **Visualisation interactive** : intégration de graphiques et tableaux de bord pour suivre les tendances et les prévisions.  
- ⚡ **Optimisation du pipeline** : amélioration des performances et du prompt engineering pour une interprétation financière encore plus fine.

---

> 🐍 **S3-erpent — là où l’intelligence artificielle rencontre la finance.**  
> *Un projet conçu avec passion, collaboration et une bonne dose de fonctions Lambda.*

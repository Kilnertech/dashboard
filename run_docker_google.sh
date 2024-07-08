#!/bin/bash

gcloud config set run/region us-central1
gcloud builds submit --tag gcr.io/united-wavelet-422322-m7/ktdashboard .
gcloud run deploy ktdashboard --image gcr.io/united-wavelet-422322-m7/ktdashboard --platform managed 
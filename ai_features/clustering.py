import streamlit as st
import pandas as pd
import plotly.express as px

# Load the cleaned data
df = pd.read_csv("cleaned_data.csv")

# Streamlit UI
st.set_page_config(page_title="Anomaly Detection Dashboard", layout="wide")

st.title("📊 Response Time Anomaly Detection")
st.markdown("This visualization highlights anomalies in response time using an **ensemble of DBSCAN & K-Means clustering**.")

# Sidebar for Filtering
st.sidebar.header("Filter Options")
show_anomalies = st.sidebar.checkbox("Show Only Anomalies", False)

# Filter Data
if show_anomalies:
    df = df[df['final_anomaly'] == 1]

# Interactive Anomaly Plot using Plotly
st.subheader("⏳ Response Time Over Time (Anomalies Highlighted)")

fig = px.scatter(
    df, 
    x="timestamp", 
    y="response_time", 
    color="final_anomaly", 
    color_discrete_map={0: "blue", 1: "red"},
    labels={"timestamp": "Timestamp", "response_time": "Response Time (ms)", "final_anomaly": "Anomaly"},
    title="Response Time Over Time",
)

fig.update_layout(
    xaxis_title="Timestamp",
    yaxis_title="Response Time (ms)",
    legend_title="Anomaly",
    xaxis=dict(tickangle=45),
)

st.plotly_chart(fig, use_container_width=True)
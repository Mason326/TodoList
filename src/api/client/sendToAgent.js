export const sendToAgent = async (
  prevMessages,
  projectWithTasks,
  message,
  token,
) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prevMessages, projectWithTasks, message }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.response?.state?.currentStep?.output) {
      return data.response.state.currentStep.output;
    }

    console.warn("Unexpected response structure:", data);
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

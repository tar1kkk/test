const fistNameInput = document.querySelector("#fistNameInput");
const lastNameInput = document.querySelector("#lastNameInput");
const emailInput = document.querySelector("#emailInput");
const phoneInput = document.querySelector("#phoneInput");
const iti = window.intlTelInput(phoneInput, {});
const sendMessageButton = document.getElementById("sendMessageButton");
const accessToken = "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";
const owner = "tar1kkk";
const repo = "test";
const filePath = "test.json";
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
let jsonData;
async function fetchData() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        const jsonContent = atob(data.content);
        jsonData = JSON.parse(jsonContent);
        console.log(jsonData);
    } catch (error) {
        console.error("Error fetching JSON:", error);
    }
}
fetchData().then(()=>{
    dataFromBack(jsonData);
});
function dataFromBack(jsonData) {
    iti.setNumber(jsonData.phone.countryCode);
    fistNameInput.value = jsonData.firstName;
    lastNameInput.value = jsonData.lastName;
    emailInput.value = jsonData.email;
    phoneInput.value = formattedPhoneNumber(jsonData);
}
function formattedPhoneNumber(jsonData) {
    const formattedPhoneNumber = jsonData.phone.countryCode + " " + jsonData.phone.number;
    return formattedPhoneNumber;
}
sendMessageButton.addEventListener("click", ()=>{
    fetchData().then(()=>{
        const message = `
            Ім'я: ${jsonData.firstName}
            Прізвище: ${jsonData.lastName}
            Email: ${jsonData.email},
            Телефон: ${jsonData.phone.countryCode} ${jsonData.phone.number}
      `;
        const botToken = "6461859467:AAGeX6I4Cb2j5dA5RveiJd_FrjYdOUCJaK0";
        const channelId = "@backendtarik";
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const params = new URLSearchParams({
            chat_id: channelId,
            text: message
        });
        axios.post(telegramUrl, params).then((response)=>{
            console.log("Message sent successfully:", response.data);
        }).catch((error)=>{
            console.error("Error sending message:", error);
        });
    });
});

//# sourceMappingURL=index.672d4772.js.map

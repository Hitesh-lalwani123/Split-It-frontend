import React, { useEffect, useState } from "react";

const shay = [
  "पानी में अक्स और किसी आसमाँ का है ये नाव कौन सी है ये दरिया कहाँ का है।",
  `खूबसूरत इंसान से मोहब्बत नहीं होती,
बल्कि जिस इंसान से होती है वो खूबसूरत लगने लगता है!`,
  `तुम हँसते हो तो मुझे हँसाने के लिए,
तुम रोते हो तो मुझे रुलाने के लिए,
एक बार हमसे रूठ कर तो देखिये,
मर जायेंगे आपको मनाने के लिए!`,
  `मुझे क्या पता तुमसे कोई हसीन है या नहीं, 
तुम्हारे सिवा कभी किसी को गौर से देखा ही नही.`,
];
const colors = [
  "bg-green-700",
  "bg-blue-700",
  "bg-red-700",
  "bg-orange-700",
  "bg-violet-700",
  "bg-slate-700",
  "bg-sky-700",
  "bg-cyan-700",
];
const Loading = ({allShayaris}) => {
  const [curr, setcurr] = useState('bg-green-800');
  const number = Math.floor(Math.random() * 10);
  const shayaris = (allShayaris)
  useEffect(()=>{
    setcurr(colors[number%8])
  },[])
  return (
    <div className={`font-semibold ${curr} rounded-md p-2 m-2 text-white`}>
      {shay[number%(shay.length)]}
    </div>
  );
};

export default Loading;

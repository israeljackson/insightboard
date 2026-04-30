function InfoCards({icon :Icon, iconBg, iconColor, value, title}) {
  return ( 
    <div className="bg-white rounded-xl p-4">

      <div className={`p-3 rounded-lg ${iconBg} inline-flex items-center justify-center mb-4`}>
        {Icon && <Icon className={`w-6 h-6 ${iconColor} justify-center items-center`}/>}
      </div>
      
      <h1 className="font-bold text-3xl mb-1">{value}</h1>
      <p className="text-xs text-gray-400 uppercase tracking-wide">{title}</p>
    </div>
   );
}

export default InfoCards;
export const MyButton = ({ children, variant = 'primary', ...props }) => {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-500 hover:bg-red-600",
    secondary: "bg-gray-500 hover:bg-gray-600"
  };

  return (
    <button 
      {...props} 
      className={`${styles[variant]} text-white px-4 py-2 rounded-lg transition-all mb-2`}
    >
      {children}
    </button>
  );
};
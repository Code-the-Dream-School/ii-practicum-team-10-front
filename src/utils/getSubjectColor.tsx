const subjectColors: { [key: string]: string } = {
    css: "bg-purple-400",
    html: "bg-blue-400",
    javascript: "bg-yellow-300",
    react: "bg-orange-400",
    nodejs: "bg-green-500",
    default: "bg-gray-400",
  };
  
  export const getSubjectColor = (subject: string) =>
    subjectColors[subject.toLowerCase()] || subjectColors.default;
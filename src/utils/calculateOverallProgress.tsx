// This function calculates the overall progress based on the progress of individual subjects.
// It takes a record of subject progress as input and returns the average progress rounded to the nearest integer.

// export const calculateOverallProgress = (
//     progress: Record<string, number>
//   ): number => {
//     const subjectEntries = Object.entries(progress).filter(
//       ([key]) => key.toLowerCase() !== "overall"
//     );
  
//     if (subjectEntries.length === 0) return 0;
  
//     const total = subjectEntries.reduce((sum, [, value]) => sum + value, 0);
//     return Math.round(total / subjectEntries.length);
//   };
  


// export const calculateOverallProgress = (progress: Record<string, number>): number => {
//     const validKeys = ["css", "html", "javascript", "react", "nodejs"];
//     const totalProgress = validKeys.reduce((sum, key) => sum + (progress[key] || 0), 0);
//     return Math.round(totalProgress / validKeys.length);
//   };

export const calculateOverallProgress = (
    progress: Record<string, number>
  ): number => {
    const cappedSubjects = ["css", "html", "javaScript"]; // те, что через Flashcard
    const otherSubjects = Object.keys(progress).filter(
      (key) => key.toLowerCase() !== "overall" && !cappedSubjects.includes(key)
    );
  
    const cappedTotal = cappedSubjects.reduce((sum, key) => {
      const value = progress[key] || 0;
      return sum + value;
    }, 0);
  
    const otherTotal = otherSubjects.reduce((sum, key) => {
      const value = progress[key] || 0;
      return sum + value;
    }, 0);
  
    // Пропорции: Flashcard темы — максимум 30%, остальные — максимум 70%
    const cappedRatio = Math.min(cappedTotal / (cappedSubjects.length * 100), 1);
    const otherRatio = Math.min(otherTotal / (otherSubjects.length * 100), 1);
  
    const overall = Math.round(cappedRatio * 30 + otherRatio * 70);
  
    return overall;
  };
  
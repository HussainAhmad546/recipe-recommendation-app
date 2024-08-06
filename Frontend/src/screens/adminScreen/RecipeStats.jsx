// import React, { useState, useEffect } from 'react';

// const RecipeStats = () => {
//   const [stats, setStats] = useState([]);

//   useEffect(() => {
//     fetch('/api/recipes/stats')
//       .then(response => response.json())
//       .then(data => setStats(data));
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Recipe Stats</h2>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2">User</th>
//             <th className="py-2">Recipes Generated</th>
//           </tr>
//         </thead>
//         <tbody>
//           {stats.map(stat => (
//             <tr key={stat.user}>
//               <td className="py-2">{stat.user}</td>
//               <td className="py-2">{stat.recipesGenerated}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RecipeStats;


import React from 'react';

const RecipeStats = () => {
  const stats = [
    { user: 'John Doe', recipesGenerated: 10 },
    { user: 'Jane Smith', recipesGenerated: 5 },
    { user: 'Sam Wilson', recipesGenerated: 7 },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Recipe Stats</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Recipes Generated</th>
            <th className="py-2 px-4 border-b">Recipes Generated</th>
            <th className="py-2 px-4 border-b">Recipes Generated</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(stat => (
            <tr key={stat.user}>
              <td className="py-2 px-4 border-b">{stat.user}</td>
              <td className="py-2 px-4 border-b">{stat.recipesGenerated}</td>
              <td className="py-2 px-4 border-b">{stat.recipesGenerated}</td>
              <td className="py-2 px-4 border-b">{stat.recipesGenerated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeStats;

import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Medal, Users } from 'lucide-react';

export default function History() {
  const milestones = [
    {
      year: "1903",
      title: "School Establishment",
      description: "St. Mary's School at Hambantota was established by Rev. Fr. Paul Coorman adjoining the church property."
    },
    {
      year: "1905",
      title: "Official Beginning",
      description: "Started officially as an English medium school in the Hambantota Church on 23 January 1905."
    },
    {
      year: "1919",
      title: "Leadership Transition",
      description: "Following the passing of Rev. Fr. Paul Coorman, Rev. Fr. L. W. Wckramasighe took over as principal."
    },
    {
      year: "1953",
      title: "New School Hall",
      description: "A new hall for the English school was completed under Rev. Fr. Joseph de Silva and declared open by Charles Edirisuriya on 13 July 1953."
    },
    {
      year: "1994",
      title: "National School Status",
      description: "St. Mary's College was officially named a National School on 15 March 1994."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <img src="/logo.png" alt="St. Mary's College Logo" className="w-24 h-24 mx-auto mb-6 rounded-2xl shadow-lg border-2 border-slate-200 object-contain bg-white" />
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            School History & Heritage
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the rich legacy of St. Mary's College, Hambantota—a storied institution that has shaped generations of leaders in the Southern Province.
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 mb-16">
          <div className="prose prose-slate max-w-none text-slate-600">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-display">A Legacy of Excellence</h2>
            <p className="mb-4">
              St. Mary's School at Hambantota was established in 1903 by Rev. Fr. Paul Coorman, adjoining the church property. He later purchased two blocks of land and extended the school. Under his vision, it formally started as an English medium school on 23 January 1905.
            </p>
            <p className="mb-4">
              Rev. Fr. L. W. Wckramasighe took charge as principal on 19 November 1919. During his tenure, to support the school, he acquired 50 acres of paddy land at Goda-Koggala in 1940 and laid the foundation for a new English school hall in 1951. After his passing, this hall was completed by his successor, Rev. Fr. Joseph de Silva, and declared open by MP Charles Edirisuriya on 13 July 1953.
            </p>
            <p>
              The institution continued to flourish over the decades, ultimately achieving National School status on 15 March 1994. Today, St. Mary's College caters to over 2,000 students and features a dedicated staff of nearly 70 teachers, committed to nurturing the talents of tomorrow while preserving the traditions of its illustrious past.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <div className="w-12 h-12 bg-maroon-700 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-display">Vision</h3>
            <p className="text-slate-300">
              To be the premier educational institution in the Southern Province, fostering holistic development and academic excellence.
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-orange-400 rounded-2xl p-8 text-slate-900">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-slate-900" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-display">Mission</h3>
            <p className="text-slate-900/80 font-medium">
              To inspire students to achieve their highest potential through a supportive, inclusive, and challenging learning environment.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900 font-display text-center mb-8">Timeline</h2>
          {milestones.map((milestone, i) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center border-4 border-white shadow-sm z-10 shrink-0">
                  <span className="font-bold text-amber-700 text-sm">{milestone.year}</span>
                </div>
                {i !== milestones.length - 1 && <div className="w-0.5 h-full bg-amber-100 mt-2"></div>}
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 flex-grow shadow-sm mb-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{milestone.title}</h3>
                <p className="text-slate-600">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

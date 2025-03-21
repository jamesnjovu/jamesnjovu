const Education = () => {
    const educations = [
        {
            institution: 'Evelyn Hone College of Applied Arts and Commerce',
            degree: 'Secondary Teachers Diploma - Computer Science',
            period: '2017 - 2019',
            details: 'Completed coursework in C++, HTML, CSS, JavaScript, PHP, MySQL, C#, systems analysis and design, database management, and computer security.',
            achievements: ['Successfully completed all required modules and projects.', 'Assessment via examinations, coursework, group projects and oral presentations.']
        },
        {
            institution: 'Evelyn Hone College of Applied Arts and Commerce',
            degree: 'CCNA Routing and Switching: Introduction to Networks',
            period: 'November 2019',
            details: 'Learned to configure network devices, implement network connectivity, configure monitoring tools, explain network access, and design IP addressing schemes.',
            achievements: ['Successfully completed all required modules and projects.']
        },
        {
            institution: 'Evelyn Hone College of Applied Arts and Commerce',
            degree: 'IT Essentials',
            period: 'August 2019',
            details: 'Learned to troubleshoot hardware/software problems, implement security, configure devices for internet/cloud services, and build/repair computers.',
            achievements: ['Successfully completed all required modules and projects.']
        },
        {
            institution: 'Chuundu Secondary School',
            degree: 'E.C.Z G.C.E Certificate',
            period: 'June 2016',
            details: 'Passed in all four subjects.',
        },
        {
            institution: 'Libala Secondary School',
            degree: 'Grade 11 to 12',
            period: '2013 - 2015',
            details: 'Passed in all 7 subjects.',
        }
    ];

    return (
        <section id="education" className="section-container">
            <h2 className="section-title">Education</h2>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200 dark:bg-indigo-800"></div>

                <div className="space-y-12">
                    {educations.map((edu, index) => (
                        <div key={index} className="relative pl-12">
                            {/* Timeline dot */}
                            <div className="absolute left-0 top-1.5 h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                {index + 1}
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-indigo-600">{edu.degree}</h3>
                                        <h4 className="text-lg font-medium">{edu.institution}</h4>
                                    </div>
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">{edu.period}</span>
                                </div>

                                <p className="mt-4 text-gray-700 dark:text-gray-300">{edu.details}</p>

                                {edu.achievements && (
                                    <div className="mt-4">
                                        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                            {edu.achievements.map((achievement, i) => (
                                                <li key={i}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;

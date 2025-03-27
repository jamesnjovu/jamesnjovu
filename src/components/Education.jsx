import { useState, useEffect, useRef } from 'react';
import { FaGraduationCap, FaCertificate, FaMedal, FaCalendarAlt, FaUniversity } from 'react-icons/fa';

const Education = () => {
    const [activeEdu, setActiveEdu] = useState(null);
    const sectionRef = useRef(null);
    
    const educations = [
        {
            institution: 'Evelyn Hone College of Applied Arts and Commerce',
            degree: 'Secondary Teachers Diploma - Computer Science',
            period: '2017 - 2019',
            type: 'degree',
            icon: <FaGraduationCap className="text-xl" />,
            details: 'Completed comprehensive coursework in C++, HTML, CSS, JavaScript, PHP, MySQL, C#, systems analysis and design, database management, and computer security.',
            achievements: ['Successfully completed all required modules and projects with distinction.', 'Assessment via examinations, coursework, group projects and oral presentations.'],
            courses: ['Programming Fundamentals', 'Web Development', 'Database Systems', 'Network Security', 'Educational Psychology']
        },
        {
            institution: 'Evelyn Hone College of Applied Arts and Commerce',
            degree: 'CCNA Routing and Switching: Introduction to Networks',
            period: 'November 2019',
            type: 'certification',
            icon: <FaCertificate className="text-xl" />,
            details: 'Learned to configure network devices, implement network connectivity, configure monitoring tools, explain network access, and design IP addressing schemes.',
            achievements: ['Successfully completed all required modules and projects with high marks.'],
            skills: ['Network Configuration', 'Routing Protocols', 'Switching Operations', 'IP Addressing', 'Network Security']
        },
        {
            institution: 'Evelyn Hone College of Applied Arts and Commerce',
            degree: 'IT Essentials',
            period: 'August 2019',
            type: 'certification',
            icon: <FaCertificate className="text-xl" />,
            details: 'Learned to troubleshoot hardware/software problems, implement security, configure devices for internet/cloud services, and build/repair computers.',
            achievements: ['Successfully completed all required modules and practical assessments.'],
            skills: ['Hardware Troubleshooting', 'Operating Systems', 'Computer Assembly', 'System Configuration', 'Technical Support']
        },
        {
            institution: 'Chuundu Secondary School',
            degree: 'E.C.Z G.C.E Certificate',
            period: 'June 2016',
            type: 'certificate',
            icon: <FaMedal className="text-xl" />,
            details: 'Passed in all four subjects with distinction.',
            subjects: ['Mathematics', 'English', 'Science', 'Computer Studies']
        },
        {
            institution: 'Libala Secondary School',
            degree: 'Grade 11 to 12',
            period: '2013 - 2015',
            type: 'education',
            icon: <FaUniversity className="text-xl" />,
            details: 'Passed in all 7 subjects with high marks.',
            subjects: ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Geography', 'Computer Studies']
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fadeInUp');
              observer.unobserve(entry.target);
            }
          },
          { threshold: 0.1 }
        );
    
        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }
    
        return () => {
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        };
      }, []);

    // Handle animation for timeline items
    useEffect(() => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeInUp');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
        
        return () => {
            timelineItems.forEach(item => {
                observer.unobserve(item);
            });
        };
    }, []);

    // Toggle education details
    const toggleDetails = (index) => {
        if (activeEdu === index) {
            setActiveEdu(null);
        } else {
            setActiveEdu(index);
        }
    }

    // Get icon based on education type
    const getTypeIcon = (type) => {
        switch (type) {
            case 'degree':
                return <FaGraduationCap className="text-primary-600 dark:text-primary-400" />;
            case 'certification':
                return <FaCertificate className="text-primary-600 dark:text-primary-400" />;
            case 'certificate':
                return <FaMedal className="text-primary-600 dark:text-primary-400" />;
            default:
                return <FaUniversity className="text-primary-600 dark:text-primary-400" />;
        }
    };

    return (
        <section id="education" className="section-container relative">
            <div ref={sectionRef} className="opacity-0">
                <h2 className="section-title">Education</h2>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-primary-600 transform md:translate-x-px"></div>

                    <div className="space-y-12">
                        {educations.map((edu, index) => (
                            <div 
                                key={index} 
                                className={`timeline-item relative md:flex ${
                                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                } opacity-0`}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 top-0 h-8 w-8 rounded-full bg-white dark:bg-dark-bg-secondary border-4 border-primary-600 dark:border-primary-400 flex items-center justify-center transform -translate-x-3.5 md:-translate-x-4 z-10">
                                    {edu.icon}
                                </div>

                                {/* Date for desktop - shown on opposite side */}
                                <div className={`hidden md:flex absolute left-1/2 top-0 items-center ${
                                    index % 2 === 0 ? 'justify-start pl-12' : 'justify-end pr-12 transform -translate-x-full'
                                }`}>
                                    <div className="flex items-center px-4 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200">
                                        <FaCalendarAlt className="mr-2 text-primary-600 dark:text-primary-400" />
                                        <span>{edu.period}</span>
                                    </div>
                                </div>

                                {/* Content card */}
                                <div className={`pl-12 md:pl-0 md:w-1/2 ${
                                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                                } pt-0 md:pt-0`}>
                                    <div 
                                        className={`bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
                                            activeEdu === index ? 'border-l-4 border-primary-600 dark:border-primary-400' : ''
                                        }`}
                                        onClick={() => toggleDetails(index)}
                                    >
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                            <div>
                                                <div className="flex items-center md:justify-end gap-2">
                                                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200">
                                                        {edu.type.charAt(0).toUpperCase() + edu.type.slice(1)}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mt-2">{edu.degree}</h3>
                                                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">{edu.institution}</h4>
                                                
                                                {/* Date for mobile */}
                                                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400 text-sm md:hidden">
                                                    <FaCalendarAlt className="mr-2" />
                                                    <span>{edu.period}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-4 text-gray-700 dark:text-gray-300">{edu.details}</p>

                                        {activeEdu === index && (
                                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
                                                {edu.courses && (
                                                    <div className="mb-4">
                                                        <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Key Courses:</h5>
                                                        <div className="flex flex-wrap gap-2">
                                                            {edu.courses.map((course, i) => (
                                                                <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1">
                                                                    {course}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {edu.skills && (
                                                    <div className="mb-4">
                                                        <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Skills Acquired:</h5>
                                                        <div className="flex flex-wrap gap-2">
                                                            {edu.skills.map((skill, i) => (
                                                                <span key={i} className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200 rounded-full px-3 py-1">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {edu.subjects && (
                                                    <div className="mb-4">
                                                        <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Subjects:</h5>
                                                        <div className="flex flex-wrap gap-2">
                                                            {edu.subjects.map((subject, i) => (
                                                                <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1">
                                                                    {subject}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {edu.achievements && (
                                                    <div>
                                                        <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Achievements:</h5>
                                                        <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                                                            {edu.achievements.map((achievement, i) => (
                                                                <li key={i} className="flex items-start">
                                                                    <span className="inline-block h-5 w-5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex-shrink-0 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                                                                        {i + 1}
                                                                    </span>
                                                                    <span>{achievement}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Education summary */}
                <div className="mt-16 bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow-md animate-staggered">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Education Summary</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        My educational background combines formal academic training in Computer Science with specialized technical certifications, providing a solid foundation in both theoretical knowledge and practical skills in software development, networking, and system administration.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                        <div className="bg-primary-50 dark:bg-primary-900/20 px-4 py-3 rounded-lg flex-1 min-w-[200px]">
                            <div className="flex items-center mb-2">
                                <FaGraduationCap className="text-primary-600 dark:text-primary-400 mr-2" />
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">Academic Education</h4>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                Secondary Teachers Diploma in Computer Science with focus on programming, web development, and database systems.
                            </p>
                        </div>
                        <div className="bg-primary-50 dark:bg-primary-900/20 px-4 py-3 rounded-lg flex-1 min-w-[200px]">
                            <div className="flex items-center mb-2">
                                <FaCertificate className="text-primary-600 dark:text-primary-400 mr-2" />
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">Technical Certifications</h4>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                Industry certifications in networking (CCNA) and IT systems providing hands-on technical expertise.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/4 -right-20 w-64 h-64 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl"></div>
        </section>
    );
};

export default Education;
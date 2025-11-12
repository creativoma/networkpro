-- NetworkPro Seed Data
-- This file contains sample data for testing the application
-- Run this AFTER running schema.sql

-- Note: In a real scenario, users would be created through Supabase Auth
-- For testing, you'll need to create test users through the Supabase Auth UI first
-- Then update the user_id references below with actual UUIDs

-- Insert sample professionals
INSERT INTO public.professionals (name, profession, company, avatar, description, location, industry, experience, status, skills, education, certifications, languages, preferences) VALUES
('Sarah Chen', 'Software Engineer', 'TechCorp', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', 'Full-stack developer with 8 years of experience in building scalable web applications. Passionate about clean code and mentoring junior developers.', 'San Francisco', 'Technology', 8, 'available', ARRAY['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS'], 'MS Computer Science, Stanford University', ARRAY['AWS Solutions Architect', 'Google Cloud Professional'], ARRAY['English', 'Mandarin'], ARRAY['Remote Work', 'Mentorship', 'Open Source']),

('Marcus Johnson', 'Product Manager', 'InnovateLabs', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', 'Strategic product leader with a track record of launching successful B2B SaaS products. Expert in agile methodologies and data-driven decision making.', 'New York', 'Technology', 10, 'available', ARRAY['Product Strategy', 'Agile', 'Data Analysis', 'UX Design', 'Stakeholder Management'], 'MBA, Harvard Business School', ARRAY['Certified Scrum Product Owner', 'PMP'], ARRAY['English', 'Spanish'], ARRAY['Networking Events', 'Speaking Engagements']),

('Elena Rodriguez', 'UX Designer', 'DesignHub', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', 'Award-winning UX designer specializing in mobile-first experiences. Advocate for inclusive design and accessibility.', 'London', 'Design', 6, 'available', ARRAY['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Accessibility'], 'BA Design, Royal College of Art', ARRAY['Google UX Design Certificate', 'Nielsen Norman Group UX Certification'], ARRAY['English', 'Spanish', 'Portuguese'], ARRAY['Remote Work', 'Design Thinking', 'Collaboration']),

('David Kim', 'Data Scientist', 'Analytics Pro', 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', 'Data scientist with expertise in machine learning and predictive analytics. Love solving complex business problems with data.', 'Tokyo', 'Data & Analytics', 7, 'available', ARRAY['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'], 'PhD Statistics, MIT', ARRAY['Google Professional Data Engineer', 'AWS Machine Learning Specialty'], ARRAY['English', 'Korean', 'Japanese'], ARRAY['Research', 'Teaching', 'Open Source']),

('Amara Okafor', 'Marketing Director', 'BrandBoost', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara', 'Creative marketing leader with 12 years driving digital transformation and brand growth for Fortune 500 companies.', 'Paris', 'Marketing', 12, 'busy', ARRAY['Digital Marketing', 'Brand Strategy', 'Content Marketing', 'SEO', 'Social Media'], 'MA Marketing, INSEAD', ARRAY['Google Analytics Certified', 'HubSpot Inbound Certified'], ARRAY['English', 'French', 'Yoruba'], ARRAY['Speaking', 'Mentorship', 'Industry Events']),

('Alex Thompson', 'DevOps Engineer', 'CloudScale', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', 'DevOps specialist focused on automation, CI/CD, and infrastructure as code. Passionate about improving developer experience.', 'Berlin', 'Technology', 5, 'available', ARRAY['Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Python'], 'BS Computer Engineering, TU Berlin', ARRAY['CKA: Certified Kubernetes Administrator', 'HashiCorp Terraform Associate'], ARRAY['English', 'German'], ARRAY['Automation', 'Open Source', 'Remote Work']),

('Priya Sharma', 'Business Analyst', 'Consultancy Plus', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', 'Business analyst bridging the gap between business needs and technical solutions. Expert in process optimization and requirements gathering.', 'Singapore', 'Consulting', 9, 'available', ARRAY['Business Analysis', 'SQL', 'Power BI', 'Process Mapping', 'Stakeholder Management'], 'MBA, National University of Singapore', ARRAY['CBAP: Certified Business Analysis Professional', 'Six Sigma Green Belt'], ARRAY['English', 'Hindi', 'Mandarin'], ARRAY['Consulting', 'Training', 'Process Improvement']),

('Carlos Mendez', 'Sales Director', 'SalesPro International', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', 'Results-driven sales leader with a proven track record in B2B software sales. Specializing in enterprise solutions and team building.', 'Mexico City', 'Sales', 11, 'available', ARRAY['Enterprise Sales', 'Team Leadership', 'CRM', 'Negotiation', 'Account Management'], 'BA Business Administration, ITAM', ARRAY['Salesforce Certified Administrator', 'Sandler Sales Training'], ARRAY['Spanish', 'English', 'Portuguese'], ARRAY['Networking', 'Public Speaking', 'Mentorship']);

-- Insert sample events
INSERT INTO public.events (name, description, date, location, category, max_attendees) VALUES
('Tech Leaders Summit 2025', 'Join industry leaders for a day of insights on emerging technologies, leadership strategies, and networking opportunities.', '2025-12-15 09:00:00+00', 'San Francisco', 'Conference', 500),

('Product Management Workshop', 'Hands-on workshop covering product strategy, roadmapping, and stakeholder management. Suitable for aspiring and current PMs.', '2025-11-25 14:00:00+00', 'New York', 'Workshop', 50),

('Design Thinking Masterclass', 'Learn design thinking methodologies and apply them to real-world challenges. Interactive sessions with industry experts.', '2025-11-30 10:00:00+00', 'London', 'Workshop', 30),

('AI & Machine Learning Meetup', 'Monthly meetup for data scientists and ML engineers to share projects, discuss trends, and network over food and drinks.', '2025-11-20 18:30:00+00', 'Tokyo', 'Meetup', 100),

('Digital Marketing Conference', 'Two-day conference featuring the latest trends in digital marketing, SEO, content strategy, and social media.', '2025-12-05 09:00:00+00', 'Paris', 'Conference', 300),

('DevOps Days', 'Community-driven conference covering DevOps practices, automation, cloud infrastructure, and continuous delivery.', '2025-11-28 09:00:00+00', 'Berlin', 'Conference', 250),

('Business Analytics Bootcamp', 'Intensive 3-day bootcamp covering data analysis, visualization, and business intelligence tools. Includes certification.', '2025-12-10 09:00:00+00', 'Singapore', 'Training', 40),

('Sales Excellence Summit', 'Annual summit for sales professionals featuring keynote speakers, breakout sessions, and networking opportunities.', '2025-12-20 08:00:00+00', 'Mexico City', 'Conference', 400),

('Startup Pitch Night', 'Watch innovative startups pitch their ideas to investors. Great networking opportunity for entrepreneurs and investors.', '2025-11-22 19:00:00+00', 'San Francisco', 'Networking', 150),

('Women in Tech Networking', 'Networking event celebrating and supporting women in technology. Featuring panel discussions and mentorship opportunities.', '2025-11-27 17:00:00+00', 'New York', 'Networking', 200);

-- Insert sample jobs
INSERT INTO public.jobs (title, company, description, location, job_type, salary_range, requirements, skills) VALUES
('Senior Full Stack Developer', 'TechVentures Inc', 'We are seeking an experienced full stack developer to join our growing engineering team. You will work on building scalable web applications using modern technologies and best practices.', 'San Francisco, CA', 'Full-time', '$140,000 - $180,000', ARRAY['5+ years of web development experience', 'Strong knowledge of React and Node.js', 'Experience with cloud platforms (AWS/GCP)', 'Excellent problem-solving skills'], ARRAY['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'AWS']),

('Product Manager - B2B SaaS', 'CloudSolutions', 'Join our product team to drive the roadmap for our flagship B2B SaaS platform. Work closely with engineering, design, and customers to deliver impactful features.', 'Remote', 'Full-time', '$130,000 - $160,000', ARRAY['3+ years of product management experience', 'B2B SaaS background preferred', 'Strong analytical and communication skills', 'Experience with agile methodologies'], ARRAY['Product Strategy', 'Agile', 'User Stories', 'Data Analysis', 'Stakeholder Management']),

('Lead UX Designer', 'DesignFirst Studio', 'We are looking for a creative and strategic UX designer to lead design initiatives for our mobile and web products. You will mentor junior designers and collaborate with cross-functional teams.', 'London, UK', 'Full-time', '£70,000 - £90,000', ARRAY['7+ years of UX design experience', 'Portfolio demonstrating user-centered design', 'Experience leading design projects', 'Strong prototyping skills'], ARRAY['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Leadership']),

('Machine Learning Engineer', 'AI Innovations', 'Build and deploy machine learning models to solve complex business problems. Work with large datasets and cutting-edge ML frameworks.', 'Tokyo, Japan', 'Full-time', '¥10,000,000 - ¥14,000,000', ARRAY['MS/PhD in Computer Science or related field', '3+ years of ML engineering experience', 'Strong programming skills in Python', 'Experience with TensorFlow or PyTorch'], ARRAY['Python', 'Machine Learning', 'TensorFlow', 'Deep Learning', 'Data Engineering']),

('Marketing Manager', 'GrowthBoost Marketing', 'Lead our digital marketing initiatives to drive customer acquisition and brand awareness. Manage campaigns across multiple channels and optimize for ROI.', 'Paris, France', 'Full-time', '€60,000 - €80,000', ARRAY['5+ years of digital marketing experience', 'Proven track record in campaign management', 'Strong analytical skills', 'Experience with marketing automation tools'], ARRAY['Digital Marketing', 'SEO', 'Content Strategy', 'Google Analytics', 'Marketing Automation']),

('DevOps Engineer', 'Infrastructure Co', 'Help us build and maintain our cloud infrastructure. Automate deployments, improve system reliability, and enhance developer productivity.', 'Berlin, Germany', 'Full-time', '€70,000 - €95,000', ARRAY['3+ years of DevOps experience', 'Strong knowledge of Kubernetes and Docker', 'Experience with CI/CD pipelines', 'Infrastructure as Code experience'], ARRAY['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD']),

('Senior Business Analyst', 'ConsultPro', 'Work with clients to understand business requirements and translate them into technical solutions. Lead requirements gathering and process improvement initiatives.', 'Singapore', 'Contract', 'S$8,000 - S$12,000/month', ARRAY['7+ years of business analysis experience', 'Consulting background preferred', 'Strong stakeholder management skills', 'Experience with process mapping'], ARRAY['Business Analysis', 'Requirements Gathering', 'Process Mapping', 'SQL', 'Stakeholder Management']),

('Sales Director - Enterprise', 'SalesTech Solutions', 'Drive enterprise sales strategy and lead a team of account executives. Build relationships with C-level executives and close complex deals.', 'New York, NY', 'Full-time', '$150,000 - $200,000 + commission', ARRAY['10+ years of enterprise software sales', 'Proven track record of exceeding quotas', 'Experience managing sales teams', 'Strong negotiation skills'], ARRAY['Enterprise Sales', 'Team Leadership', 'Salesforce', 'Negotiation', 'Account Management']),

('Frontend Developer', 'StartupX', 'Join our early-stage startup to build beautiful and performant user interfaces. Work directly with founders and have significant impact on product direction.', 'Remote', 'Full-time', '$90,000 - $120,000 + equity', ARRAY['3+ years of frontend development', 'Strong React experience', 'Eye for design and attention to detail', 'Startup experience preferred'], ARRAY['React', 'TypeScript', 'CSS', 'Responsive Design', 'UI/UX']),

('Data Analyst', 'Analytics Hub', 'Analyze data to uncover insights that drive business decisions. Create dashboards and reports for stakeholders across the organization.', 'Remote', 'Part-time', '$40 - $60/hour', ARRAY['2+ years of data analysis experience', 'Strong SQL skills', 'Experience with BI tools', 'Excellent communication skills'], ARRAY['SQL', 'Python', 'Power BI', 'Excel', 'Data Visualization']),

('Backend Developer', 'MicroServices Corp', 'Build and maintain microservices architecture using Node.js and Go. Design APIs and optimize database performance.', 'San Francisco, CA', 'Full-time', '$130,000 - $170,000', ARRAY['4+ years of backend development', 'Strong knowledge of Node.js or Go', 'Experience with microservices architecture', 'Database design experience'], ARRAY['Node.js', 'Go', 'PostgreSQL', 'MongoDB', 'REST APIs']),

('Junior Product Designer', 'CreativeApp', 'Start your career in product design! Work alongside senior designers to create intuitive and delightful user experiences.', 'London, UK', 'Full-time', '£35,000 - £45,000', ARRAY['1-2 years of design experience or recent graduate', 'Portfolio showing design process', 'Knowledge of Figma', 'Eagerness to learn and grow'], ARRAY['Figma', 'UI Design', 'Prototyping', 'User Research', 'Design Systems']);

-- Note: To test connections, messages, favorites, and event_registrations,
-- you'll need to have actual authenticated users in your Supabase project.
-- These tables have foreign key constraints to auth.users.

-- Example queries to insert test data after you have users:
-- INSERT INTO public.event_registrations (event_id, user_id, status) VALUES ('event-uuid', 'user-uuid', 'registered');
-- INSERT INTO public.connections (requester_id, addressee_id, status) VALUES ('user-uuid-1', 'user-uuid-2', 'accepted');
-- INSERT INTO public.messages (sender_id, receiver_id, content) VALUES ('user-uuid-1', 'user-uuid-2', 'Hello! Would love to connect.');
-- INSERT INTO public.favorites (user_id, professional_id) VALUES ('user-uuid', 'professional-uuid');

export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('mentors').del()
  await knex('mentors').insert([
  {
    name: 'Dylan McNamara',
    specialty: 'Technology',
    industries: '["Tech", "Software Development"]',
    email: 'dylan.mcnamara@example.com',
    is_featured: 0,
    bio: 'Experienced technologist with a passion for innovation and problem-solving.'
  },
  {
    name: 'Clinton Lin',
    specialty: 'Marketing',
    industries: '["Marketing", "E-commerce"]',
    email: 'clinton.lin@example.com',
    is_featured: 0,
    bio: 'Experienced marketer with a focus on digital strategies and brand development.'
  },
  {
    name: 'Alice Johnson',
    specialty: 'Finance',
    industries: '["Finance", "Investment"]',
    email: 'alice.johnson@example.com',
    is_featured: 1,
    bio: 'Finance professional with expertise in investment management and financial planning.'
  },
  {
    name: 'Bob Brown',
    specialty: 'Product Development',
    industries: '["Product Management", "Startups"]',
    email: 'bob.brown@example.com',
    is_featured: 1,
    bio: 'Product development specialist with a track record of launching successful products.'
  },
  {
    name: 'Sarah Lee',
    specialty: 'Operations',
    industries: '["Operations Management", "Logistics"]',
    email: 'sarah.lee@example.com',
    is_featured: 1,
    bio: 'Operations manager with a background in logistics and supply chain management.'
  },
  {
    name: 'Michael Wilson',
    specialty: 'Legal',
    industries: '["Legal", "Business Law"]',
    email: 'michael.wilson@example.com',
    is_featured: 0,
    bio: 'Legal expert specializing in business law and corporate governance.'
  },
  {
    name: 'Emily Davis',
    specialty: 'Human Resources',
    industries: '["HR", "Recruiting"]',
    email: 'emily.davis@example.com',
    is_featured: 0,
    bio: 'Human resources professional with a passion for talent acquisition and employee development.'
  },
  {
    name: 'David Clark',
    specialty: 'Sales',
    industries: '["Sales", "Business Development"]',
    email: 'david.clark@example.com',
    is_featured: 0,
    bio: 'Sales strategist with a proven record of driving revenue growth and expanding market reach.'
  },
  {
    name: 'Linda Martinez',
    specialty: 'Customer Experience',
    industries: '["Customer Service", "Customer Success"]',
    email: 'linda.martinez@example.com',
    is_featured: 0,
    bio: 'Customer experience advocate with a focus on enhancing customer satisfaction and loyalty.'
  },
  {
    name: 'Peter Adams',
    specialty: 'Leadership',
    industries: '["Leadership", "Management"]',
    email: 'peter.adams@example.com',
    is_featured: 0,
    bio: 'Leadership coach with a mission to empower individuals and teams to reach their full potential.'
  },
  {
    name: 'Grace Moore',
    specialty: 'Public Relations',
    industries: '["PR", "Media Relations"]',
    email: 'grace.moore@example.com',
    is_featured: 0,
    bio: 'Public relations expert specializing in media relations and crisis communication.'
  },
  {
    name: 'Tom White',
    specialty: 'Strategy',
    industries: '["Business Strategy", "Consulting"]',
    email: 'tom.white@example.com',
    is_featured: 0,
    bio: 'Strategy consultant with a background in business strategy and organizational development.'
  },
  {
    name: 'Olivia Taylor',
    specialty: 'Design',
    industries: '["Graphic Design", "UI/UX Design"]',
    email: 'olivia.taylor@example.com',
    is_featured: 0,
    bio: 'Design professional with a passion for creating visually stunning and user-friendly experiences.'
  },
  {
    name: 'Richard Harris',
    specialty: 'Mentorship',
    industries: '["Mentorship", "Career Development"]',
    email: 'richard.harris@example.com',
    is_featured: 0,
    bio: 'Mentorship advocate dedicated to helping others achieve their career goals and aspirations.'
  },
  {
    name: 'Karen Evans',
    specialty: 'Startups',
    industries: '["Startups", "Entrepreneurship"]',
    email: 'karen.evans@example.com',
    is_featured: 0,
    bio: 'Entrepreneurship enthusiast with a focus on supporting startup ventures and fostering innovation.'
  },
]);
};


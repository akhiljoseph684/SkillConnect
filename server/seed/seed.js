import dotenv from "dotenv";
import driver from "../src/config/database.js";

dotenv.config();

const seedDatabase = async () => {
  const session = driver.session();

  try {
    console.log("🌱 Starting database seed...");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("🗑️ Existing data cleared.");

    await session.run(`
      CREATE
        (:Developer {
          id: "dev-1",
          name: "John Doe",
          email: "john@example.com",
          bio: "Full-stack developer specializing in JavaScript."
        }),
        (:Developer {
          id: "dev-2",
          name: "Sarah Smith",
          email: "sarah@example.com",
          bio: "Backend developer specializing in Node.js."
        }),
        (:Developer {
          id: "dev-3",
          name: "Alex Johnson",
          email: "alex@example.com",
          bio: "Frontend developer specializing in React."
        }),
        (:Developer {
          id: "dev-4",
          name: "David Wilson",
          email: "david@example.com",
          bio: "Developer interested in Python and data engineering."
        })
    `);

    await session.run(`
      CREATE
        (:Skill {id: "skill-1", name: "JavaScript"}),
        (:Skill {id: "skill-2", name: "React"}),
        (:Skill {id: "skill-3", name: "Node.js"}),
        (:Skill {id: "skill-4", name: "Python"}),
        (:Skill {id: "skill-5", name: "MongoDB"})
    `);

    await session.run(`
      CREATE
        (:Project {
          id: "project-1",
          name: "E-Commerce Platform",
          description: "Online shopping platform"
        }),
        (:Project {
          id: "project-2",
          name: "Task Management App",
          description: "Application for managing daily tasks"
        }),
        (:Project {
          id: "project-3",
          name: "Social Media App",
          description: "Social networking application"
        })
    `);

    await session.run(`
      CREATE
        (:Technology {id: "tech-1", name: "Express.js"}),
        (:Technology {id: "tech-2", name: "Next.js"}),
        (:Technology {id: "tech-3", name: "PostgreSQL"})
    `);

    console.log("📦 Nodes created.");

    await session.run(`
      MATCH
        (john:Developer {id: "dev-1"}),
        (sarah:Developer {id: "dev-2"}),
        (alex:Developer {id: "dev-3"}),
        (david:Developer {id: "dev-4"}),

        (javascript:Skill {id: "skill-1"}),
        (react:Skill {id: "skill-2"}),
        (nodejs:Skill {id: "skill-3"}),
        (python:Skill {id: "skill-4"}),
        (mongodb:Skill {id: "skill-5"})

      CREATE
        (john)-[:HAS_SKILL]->(javascript),
        (john)-[:HAS_SKILL]->(react),
        (john)-[:HAS_SKILL]->(nodejs),
        (john)-[:HAS_SKILL]->(mongodb),

        (sarah)-[:HAS_SKILL]->(javascript),
        (sarah)-[:HAS_SKILL]->(nodejs),
        (sarah)-[:HAS_SKILL]->(mongodb),

        (alex)-[:HAS_SKILL]->(javascript),
        (alex)-[:HAS_SKILL]->(react),

        (david)-[:HAS_SKILL]->(python)
    `);

    await session.run(`
      MATCH
        (john:Developer {id: "dev-1"}),
        (sarah:Developer {id: "dev-2"}),
        (alex:Developer {id: "dev-3"}),
        (david:Developer {id: "dev-4"}),

        (ecommerce:Project {id: "project-1"}),
        (task:Project {id: "project-2"}),
        (social:Project {id: "project-3"})

      CREATE
        (john)-[:WORKED_ON]->(ecommerce),
        (sarah)-[:WORKED_ON]->(ecommerce),

        (john)-[:WORKED_ON]->(task),
        (alex)-[:WORKED_ON]->(task),

        (alex)-[:WORKED_ON]->(social),
        (david)-[:WORKED_ON]->(social)
    `);

    await session.run(`
      MATCH
        (ecommerce:Project {id: "project-1"}),
        (task:Project {id: "project-2"}),
        (social:Project {id: "project-3"}),

        (express:Technology {id: "tech-1"}),
        (nextjs:Technology {id: "tech-2"}),
        (postgresql:Technology {id: "tech-3"})

      CREATE
        (ecommerce)-[:USES]->(express),
        (ecommerce)-[:USES]->(task),
        (task)-[:USES]->(nextjs),
        (task)-[:USES]->(postgresql),
        (social)-[:USES]->(express)
    `);

    await session.run(`
      MATCH
        (john:Developer {id: "dev-1"}),
        (sarah:Developer {id: "dev-2"}),
        (alex:Developer {id: "dev-3"}),
        (david:Developer {id: "dev-4"})

      CREATE
        (john)-[:COLLABORATED_WITH]->(sarah),
        (john)-[:COLLABORATED_WITH]->(alex),
        (alex)-[:COLLABORATED_WITH]->(david)
    `);

    console.log("🔗 Relationships created.");
    console.log("✅ Database seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
};

seedDatabase();
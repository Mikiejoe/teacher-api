import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Learning API Documentation',
        version: '1.0.0',
        description: 'API documentation for the learning platform',
      },
      components: {
        schemas: {
          Category: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Name of the category',
                example: 'College',
              },
              description: {
                type: 'string',
                description: 'Description of the category',
                example: 'College-level courses',
              },
            },
            required: ['name', 'description'],
          },
          Subject: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Name of the subject',
                example: 'Mathematics',
              },
              lesson: {
                type: 'string',
                description: 'Lesson ID that this subject is associated with',
                example: '64bf9e732e1a4c1b83c30f71',
              },
            },
            required: ['name', 'lesson'],
          },
          Topic: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Name of the topic',
                example: 'Algebra',
              },
              description: {
                type: 'string',
                description: 'Description of the topic',
                example: 'Basic Algebra topics including polynomials and equations.',
              },
              subject: {
                type: 'string',
                description: 'Subject ID that this topic is associated with',
                example: '64bf9e732e1a4c1b83c30f72',
              },
            },
            required: ['name', 'description', 'subject'],
          },
          SubTopic: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Name of the subtopic',
                example: 'Solving Linear Equations',
              },
              description: {
                type: 'string',
                description: 'Description of the subtopic',
                example: 'Solving first-degree equations with one variable.',
              },
              topic: {
                type: 'string',
                description: 'Topic ID that this subtopic is related to',
                example: '64bf9e732e1a4c1b83c30f73',
              },
            },
            required: ['name', 'description', 'topic'],
          },
          Learner: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'Email of the learner',
                example: 'jane.doe@example.com',
              },
              uid: {
                type: 'string',
                description: 'UID of the learner',
                example: '23456yhvcsfghj',
              },
            },
            required: ['email', 'uid'],
          },
          MyLearning: {
            type: 'object',
            properties: {
              learner: {
                type: 'string',
                description: 'Learner ID',
                example: '64bf9e732e1a4c1b83c30f74',
              },
              subTopic: {
                type: 'string',
                description: 'SubTopic ID',
                example: '64bf9e732e1a4c1b83c30f75',
              },
              questions: {
                type: 'array',
                description: 'List of questions related to the subtopic',
                items: {
                  type: 'object',
                  properties: {
                    question: {
                      type: 'string',
                      description: 'The question text',
                      example: 'What is the solution to 2x + 5 = 15?',
                    },
                    options: {
                      type: 'array',
                      items: {
                        type: 'string',
                        description: 'Possible answer options for the question',
                        example: '[x = 5, x = 10, x = 15, x = 20]',
                      },
                    },
                    correctAnswer: {
                      type: 'object',
                      description: 'The correct answer with explanation',
                      properties: {
                        basicAnswer: {
                          type: 'string',
                          description: 'Basic correct answer',
                          example: 'x = 5',
                        },
                        detailedAnswer: {
                          type: 'string',
                          description: 'Detailed explanation of the answer',
                          example: 'First, subtract 5 from both sides, then divide by 2.',
                        },
                      },
                    },
                  },
                },
              },
            },
            required: ['learner', 'subTopic', 'questions'],
          },
        },
      },
    },
    apis: ['./routers/*.js'], 
  };

export const swaggerSpecs = swaggerJsdoc(swaggerOptions);


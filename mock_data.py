from faker import Faker
import random

fake = Faker()

# Generate and print 500 rows of mock data
for _ in range(500):
    projectName = fake.catch_phrase()
    projectDetails = fake.text()
    projectCategory = random.choice(['Web Development', 'Mobile Development', 'Data Analytics', 'IoT', 'Blockchain'])
    projectValue = fake.random_int(min=1000, max=50000)
    imageUrl = fake.image_url()

    print(f"INSERT INTO Projects (projectName, projectDetails, projectCategory, projectValue, imageUrl) VALUES ('{projectName}', '{projectDetails}', '{projectCategory}', '{projectValue}', '{imageUrl}');")

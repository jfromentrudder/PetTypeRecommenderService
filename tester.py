import requests

recommendation = requests.post('http://localhost:8080/pet-type-recommendation',
                              json={'size': 5, 'space': 6, 'interaction': 4, 'cost':7})

print(recommendation.json())

mult_recommendations = requests.post('http://localhost:8080/pet-type-recommendation-multiple',
                                     json={'size': 5, 'space': 6, 'interaction': 4, 'cost':7})

print(mult_recommendations.json())
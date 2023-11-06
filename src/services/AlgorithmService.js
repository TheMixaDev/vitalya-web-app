import { NetworkService } from "./NetworkService";

export const AlgorithmService = {
    calculateMenu(cookies, success, fail) {
        //debugging measures
        return success({
            "diet": 1,
            "eatings": [
                {
                    "name": "First",
                    "dishes": [
                        {
                            "id": 302,
                            "name": "Dish 302",
                            "logo": "Logo 302",
                            "calories": 414.342568699118,
                            "protein": 7.984914634182955,
                            "fat": 8.7186525035175,
                            "carbohydrates": 4.0743553336106295,
                            "cellulose": 0.0,
                            "weight": 269.5120483747701,
                            "timeToCook": 120,
                            "dietId": {
                                "id": 1,
                                "name": "Diet1"
                            },
                            "typeId": {
                                "id": 1,
                                "name": "DishType1"
                            },
                            "ingredients": [
                                {
                                    "id": 1,
                                    "name": "Ingredient 1",
                                    "measureType": 1,
                                    "measureCount": 2.0
                                }
                            ]
                        },
                        {
                            "id": 4376,
                            "name": "Dish 4376",
                            "logo": "Logo 4376",
                            "calories": 463.3896789928923,
                            "protein": 8.130966965344818,
                            "fat": 14.742856651694566,
                            "carbohydrates": 7.436587345846827,
                            "cellulose": 8.824902409649855,
                            "weight": 155.4191511120353,
                            "timeToCook": 119,
                            "dietId": {
                                "id": 1,
                                "name": "Diet1"
                            },
                            "typeId": {
                                "id": 1,
                                "name": "DishType1"
                            },
                            "ingredients": []
                        },
                        {
                            "id": 9643,
                            "name": "Dish 9643",
                            "logo": "Logo 9643",
                            "calories": 445.56646953195786,
                            "protein": 3.634124031761459,
                            "fat": 5.40389114937807,
                            "carbohydrates": 2.3867314868794196,
                            "cellulose": 8.737337910808169,
                            "weight": 287.24482126364256,
                            "timeToCook": 119,
                            "dietId": {
                                "id": 1,
                                "name": "Diet1"
                            },
                            "typeId": {
                                "id": 1,
                                "name": "DishType1"
                            },
                            "ingredients": []
                        },
                        {
                            "id": 21604,
                            "name": "Dish 21604",
                            "logo": "Logo 21604",
                            "calories": 269.01167551821436,
                            "protein": 7.773185912297668,
                            "fat": 24.764622700110703,
                            "carbohydrates": 6.218850668532792,
                            "cellulose": 8.343482566052005,
                            "weight": 101.2273744340098,
                            "timeToCook": 118,
                            "dietId": {
                                "id": 1,
                                "name": "Diet1"
                            },
                            "typeId": {
                                "id": 1,
                                "name": "DishType1"
                            },
                            "ingredients": []
                        }
                    ],
                    "micronutrients": {
                        "calories": 1592.3103927421826,
                        "protein": 27.523191543586904,
                        "fat": 53.63002300470084,
                        "carbohydrates": 20.11652483486967,
                        "cellulose": 25.905722886510027
                    },
                    "idealMicronutrients": {
                        "calories": 1600.0,
                        "protein": 800.0,
                        "fat": 355.5555555555556,
                        "carbohydrates": 800.0,
                        "cellulose": 40.0
                    }
                },
                {
                    "name": "Second",
                    "dishes": [
                        {
                            "id": 19038,
                            "name": "Dish 19038",
                            "logo": "Logo 19038",
                            "calories": 187.58873971103216,
                            "protein": 1.317731718158246,
                            "fat": 31.50426727189452,
                            "carbohydrates": 8.550125774656614,
                            "cellulose": 4.246415297601496,
                            "weight": 155.55230713852262,
                            "timeToCook": 118,
                            "dietId": {
                                "id": 1,
                                "name": "Diet1"
                            },
                            "typeId": {
                                "id": 2,
                                "name": "DishType2"
                            },
                            "ingredients": []
                        },
                        {
                            "id": 19140,
                            "name": "Dish 19140",
                            "logo": "Logo 19140",
                            "calories": 210.5900460928953,
                            "protein": 9.768184552344637,
                            "fat": 7.26378258030461,
                            "carbohydrates": 8.31479852929573,
                            "cellulose": 4.028584763774737,
                            "weight": 151.81673605357025,
                            "timeToCook": 119,
                            "dietId": {
                                "id": 1,
                                "name": "Diet1"
                            },
                            "typeId": {
                                "id": 2,
                                "name": "DishType2"
                            },
                            "ingredients": []
                        }
                    ],
                    "micronutrients": {
                        "calories": 398.17878580392744,
                        "protein": 11.085916270502883,
                        "fat": 38.76804985219913,
                        "carbohydrates": 16.864924303952343,
                        "cellulose": 8.275000061376232
                    },
                    "idealMicronutrients": {
                        "calories": 400.0,
                        "protein": 200.0,
                        "fat": 88.8888888888889,
                        "carbohydrates": 200.0,
                        "cellulose": 10.0
                    }
                }
            ],
            "params": {
                "calories": 1990.48917854611,
                "protein": 38.60910781408979,
                "fat": 92.39807285689997,
                "carbohydrates": 36.981449138822015,
                "cellulose": 34.18072294788626
            },
            "idealParams": {
                "calories": 2000.0,
                "minProtein": 0.0,
                "maxProtein": 1000.0,
                "minFat": 0.0,
                "maxFat": 444.44444444444446,
                "minCarbohydrates": 0.0,
                "maxCarbohydrates": 1000.0,
                "minCellulose": 25.0,
                "maxCellulose": 50.0
            }
        });
        NetworkService.POSTAuth(`/menu/calculate`, {}, cookies, data => {
            success(data);
        }, fail);
    }
}
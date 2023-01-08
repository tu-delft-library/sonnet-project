import openai
import json
import os


def poemify(abstract, lang):
    if lang == "EN":
        language = "an English"
    elif lang == "NL":
        language = "a Dutch"

    openai.api_key = os.getenv('OPENAI_KEY')
    # response = openai.Completion.create(
    #     model="text-davinci-003",
    #     # prompt="Summarize to two sentences: {}".format(abstract),
    #     prompt = "Extract keywords of: {}".format(abstract),
    #     temperature=0.7,
    #     max_tokens=500,
    #     top_p=0.5,
    #     frequency_penalty=0.5,
    #     presence_penalty=0.5
    # )

    # response_summary = response.choices[0].text.replace("\n", " ")
    # poem_list = []
    poem_list = []

    # poemformlst = ["Petrarchan sonnet",
    #                "Shakespearean sonnet",
    #                "Spenserian sonnet",
    #                "Miltonic sonnet"]  # "free verse", "limerick", "haiku", "villanelle"]

    poemformlst = ["quatorzain"]

    poem_dict = dict()
    for pform in poemformlst:
        poem_response = openai.Completion.create(
            model="text-davinci-003",
            prompt="Write {} {} about the following abstract: {}".format(language, pform, abstract),
            temperature=0.5,
            max_tokens=500,
            top_p=0.5,
            frequency_penalty=0.5,
            presence_penalty=0.5
        )
        poem_list.append(poem_response.choices[0].text)
        poem_dict[pform] = poem_response.choices[0].text

    json_object = json.dumps(poem_response, indent=10)
    return poem_dict



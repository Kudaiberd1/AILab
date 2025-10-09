from tag.models import *
from stack.models import *
from photos.models import *
from authors.models import *

def check_new_photo(data):
    photos = list(data)
    new=[]

    for photo in photos:
        try:
            PhotoModel.objects.get(photo=photo)
        except:
            new_tag = PhotoModel.objects.create(photo=photo)
        
        
        new.append(PhotoModel.objects.filter(photo=photo).values()[0]['id'])

    return new

def check_new_tag(data):
    tags = list(data)
    new=[]

    for tag in tags:
        try:
            TagModel.objects.get(tag_name=tag)
        except:
            new_tag = TagModel.objects.create(tag_name=tag)
        
        
        new.append(TagModel.objects.filter(tag_name=tag).values()[0]['id'])

    return new


def check_new_stack(data):
    stacks = list(data)
    new=[]

    for stack in stacks:
        try:
            StackModel.objects.get(stack_name=stack)
        except:
            new_tag = StackModel.objects.create(stack_name=stack)
        
        
        new.append(StackModel.objects.filter(stack_name=stack).values()[0]['id'])
    
    print(new, "author vdjsnjnjcdnkcdncdcjcjcjdnjkckcndkcndkcnjcdcjcndj")


    return new

def check_new_author(data):
    authors = list(data)
    new=[]

    for author in authors:
        try:
            AuthorModel.objects.get(name=author[0], surename=author[1])
            #print(AuthorModel.objects.filter(name=author[0], surename=author[1]))
        except:
            new_tag = AuthorModel.objects.create(name=author[0], surename=author[1])
        
        #print(AuthorModel.objects.filter(name=author, surename=author[1]).values())
        new.append(AuthorModel.objects.filter(name=author[0], surename=author[1]).values()[0]['id'])
    
    print(new, "author vdjsnjnjcdnkcdncdcjcjcjdnjkckcndkcndkcnjcdcjcndj")

    return new


def format_check_data(data):

    f_data=data

    f_data['tags']=check_new_tag(f_data['tags'])
    f_data['stacks']=check_new_stack(f_data['stacks'])
    f_data['photo']=check_new_photo(f_data['photo'])
    f_data['author']=check_new_author(f_data['author'])

    return f_data
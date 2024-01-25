from django.shortcuts import render, get_object_or_404
from .models import Item

# Create your views here.
def detail(request, pk):
    #pk = primary key
    item = get_object_or_404(Item, pk=pk) #from model and from url
    return render(request, 'item/detail.html', {
        'item': item
    })

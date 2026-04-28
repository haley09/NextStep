from django.contrib import admin
from .models import Job
from .models import Swipe
from .models import Match
from .models import Message

admin.site.register(Job)
admin.site.register(Swipe)
admin.site.register(Match)
admin.site.register(Message)
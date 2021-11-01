from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.admin.edit_handlers import MultiFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.search import index

class ContactsPage(Page):
    main_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    lat = models.CharField(max_length=30)
    lon = models.CharField(max_length=30)
    address = models.CharField(max_length=100)
    phone1 = models.CharField(max_length=30, default='')
    phone2 = models.CharField(max_length=30, default='', blank=True)
    intro = models.CharField(max_length=250)
    keywords = models.CharField(max_length=300, blank=True)

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('intro'),
        ImageChooserPanel('main_image'),
        FieldPanel('lat'),
        FieldPanel('lon'),
        FieldPanel('address'),
        FieldPanel('phone1'),
        FieldPanel('phone2'),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('keywords'),
    ]
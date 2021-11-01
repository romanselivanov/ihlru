from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.search import index

class CareerPage(Page):
    main_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    body = RichTextField(blank=True)

    keywords = models.CharField(max_length=300, blank=True)

    search_fields = Page.search_fields + [
        index.SearchField('body'),
    ]

    content_panels = Page.content_panels + [
        ImageChooserPanel('main_image'),
        FieldPanel('body'),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('keywords'),
    ]

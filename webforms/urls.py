from django.conf.urls import url
from .decorators import check_recaptcha

from webforms import views as webforms

urlpatterns = [

	url(r'^order\-footer$', check_recaptcha(webforms.main_page_footer_form), name="webform_order_services"),
	url(r'^call\-toback$', webforms.call_back, name="webform_call_back"),
	url(r'^anketa$', webforms.anketa, name="webform_anketa"),

]
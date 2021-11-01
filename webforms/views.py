from django.core.mail import send_mail
from django.shortcuts import render, Http404
from django.views.decorators.http import require_GET, require_POST
from django.template.loader import render_to_string
from django.conf import settings
from django.core.mail import EmailMessage
import json

@require_POST
def main_page_footer_form(request):
	if request.recaptcha_is_valid:

		json_data = json.loads(request.body)
		form_data = {
			"company": json_data["company"],
			"fio": json_data["fio"],
			"phone": json_data["phone"],
			"business": json_data["business"],
			"position": json_data["position"],
			"email": json_data["email"],
			"message": json_data["message"],
		}

		msg_text = render_to_string("webforms/email/email_form_main_page_footer.html", {"data": form_data})
		send_mail("Обращение с сайта", msg_text, "ihlru.post@gmail.com", settings.MAIL_INIHL,
				html_message=msg_text)

		return render(request, "webforms/thx.html")
		
	else:
		return render(request, "webforms/thx.html")

# @require_POST
# def contact_page_form(request):

# 	form_data = {
# 		"theme": request.POST.get("theme", ""),
# 		"company": request.POST.get("company", ""),
# 		"fio": request.POST.get("fio", ""),
# 		"position": request.POST.get("position", ""),
# 		"phone": request.POST.get("phone", ""),
# 		"aditional_phone": request.POST.get("aditional_phone", ""),
# 		"email": request.POST.get("email", ""),
# 	}
# 	msg_text = render_to_string("webforms/email/email_form_contacts_moscow.html", {"data": form_data})
	# send_mail("Обращение с сайта", msg_text, "o-tula@ihl.ru", settings.MAIL_INIHL,
	# 		  html_message=msg_text)

# 	return render(request, "webforms/thx.html")


def call_back(request):
	"""кнопка обратного звонка"""
	if "GET" == request.method:
		return render(request, 'webforms/pages/call_back.html')

	elif "POST" == request.method:
		json_data = json.loads(request.body)

		form_data = {
			"theme": json_data["theme"],
			"fio": json_data["fio"],
			"phone": json_data["phone"],
			"message": json_data["message"],
		}

		msg_text = render_to_string("webforms/email/email_form_call_back.html", {"data": form_data})
		send_mail("Обращение с сайта", msg_text, "ihlru.post@gmail.com", settings.MAIL_INIHL,
				  html_message=msg_text)

		return render(request, "webforms/thx.html")


def anketa(request):
	"""anketa operatora"""
	if "GET" == request.method:
		return render(request, 'webforms/pages/anketa.html')

	elif "POST" == request.method:
		print(request.body)
		json_data = json.loads(request.body)

		form_data = {
			"theme": json_data["theme"],
			"fio": json_data["fio"],
			"age": json_data["age"],
			"education": json_data["education"],
			"experience": json_data["experience"],
			"schedule": json_data["schedule"],
			"phone": json_data["phone"],
			"email": json_data["email"],
		}

		msg_text = render_to_string("webforms/email/email_form_anketa.html", {"data": form_data})
		send_mail("Обращение с сайта", msg_text, "ihlru.post@gmail.com", settings.MAIL_PERSONAL,
				  html_message=msg_text)

		return render(request, "webforms/thx.html")

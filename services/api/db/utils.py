from django.core.mail import EmailMultiAlternatives, get_connection
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings


#TODO: This file will be used for various common email tasks.
def send_reset_password_email(recipient_email, uid, token, current_site):
    try:
        connection = get_connection(
        backend=settings.EMAIL_BACKEND,
        host=settings.EMAIL_HOST,
        port=settings.EMAIL_PORT,
        username=settings.EMAIL_HOST_USER,
        password=settings.EMAIL_HOST_PASSWORD,
        use_tls=True, ) # or use_ssl=True for SSL
        subject = "Action Required: Reset Your Password"
        from_email = settings.EMAIL_HOST_USER
        to = [recipient_email]
        # Load the HTML template
        relative_link = f"/home/reset-password/?uidb64={uid}&token={token}&email={recipient_email}"
        reset_url = str(current_site) + relative_link
        html_content = render_to_string('reset_password_email.html', {'reset_url': reset_url, 'email': to[0]})
        # Create the email body with both HTML and plain text versions
        text_content = strip_tags(html_content)
        email = EmailMultiAlternatives(subject, text_content, from_email, to, connection=connection)
        email.attach_alternative(html_content, "text/html")
        email.send()
    except Exception as e:
        # Print logs if in DEBUG mode
        if settings.DEBUG:
            print(e)
        return

from django.shortcuts import render, get_object_or_404
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.mail import EmailMessage
from django.core.files.storage import FileSystemStorage

def cv_fb(request):
    return render(request,
        'cvlandingpage/index.html')

def contact(request):
    if request.method == 'GET':
        name= request.GET.get('name', None)
        email=request.GET.get('email', None)
        message=request.GET.get('message', None)
        try:
            email = EmailMessage( name,
            message,
            "Your website",
            ['felipe.bahamonde.m@ug.uchile.cl'],
            headers = {'Reply-To': email })
            email.send()
        except BadHeaderError:
            return JsonResponse({'msg':''})
    return JsonResponse({'msg':'success'})

def cvpdf(request):
    fs = FileSystemStorage()
    filename = 'cvlandingpage/static/pdf/cvfb.pdf'
    if fs.exists(filename):
        with fs.open(filename) as pdf:
            response = HttpResponse(pdf, content_type='application/pdf')
            response['Content-Disposition'] = 'inline; filename="pdf/cvfb.pdf"'
            return response

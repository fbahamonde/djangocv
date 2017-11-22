from django.shortcuts import render, get_object_or_404
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.mail import EmailMessage
from django.core.files.storage import FileSystemStorage
from django.utils import timezone
from blog.models import Post, Comment, CommentForm

def cv_fb(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    comments = Comment.objects.filter(active=True)
    return render(request,
        'cvlandingpage/index.html', {'posts': posts,'comments': comments})

def comentario(request):
    if request.method == 'POST':
        # A comment was posted
        comment_form = CommentForm(data=request.POST)
        if comment_form.is_valid():
            # Create Comment object but don't save to database yet
            new_comment = comment_form.save(commit=False)
            # Assign the current post to the comment
            new_comment.post = post
            # Save the comment to the database
            new_comment.save()
    else:
        comment_form = CommentForm()
    return render(request,
        'cvlandingpage/index.html/#blog')
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
        with fs.open(filename,'rb') as pdf:
            response = HttpResponse(pdf.read(), content_type='application/pdf')
            response['Content-Disposition'] = 'inline; filename="pdf/cvfb.pdf"'
            return response

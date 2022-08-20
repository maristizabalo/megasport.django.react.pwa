from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from apps.category.serializers import CategorySerializer
from .models import Category

class ListCategoriesView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        if Category.objects.all().exists():
            categories = Category.objects.all()
            categories_serializer = CategorySerializer(categories, many= True)
                
            return Response(categories_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron categorias'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from apps.product.models import Product
from apps.product.serializers import ProductSerializer
from apps.category.models import Category

from django.db.models import Q


class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, productId, format=None):
        try:
            product_id=int(productId)
        except:
            return Response(
                {'error': 'El id del producto debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND
            )

        if(Product.objects.filter(id=product_id).exists()):
            product = Product.objects.get(id=product_id)

            product = ProductSerializer(product)

            return Response({'product': product.data}, status = status.HTTP_200_OK)
        else:
            return Response (
                {'error': 'El producto con este ID  no existe'},
                status= status.HTTP_404_NOT_FOUND
            )

class ListProductsView(APIView):
    permission_classes = ( permissions.AllowAny,)

    def get(self, request, format=None):
        sortBy = request.query_params.get('sortBy')

        if not (sortBy == 'date_created' or sortBy == 'price' or sortBy == 'name'):
            sortBy = 'date_created'

        order = request.query_params.get('order')
        limit = request.query_params.get('limit')

        if not limit:
            limit = 6
        
        try:
            limit = int(limit)
        except:
            return Response(
                {'error': 'Limite debe ser entero'},
                status=status.HTTP_404_NOT_FOUND
            ) 

        if limit <= 0:
            limit = 6
         
        if order == 'desc':
            sortBy = '-' + sortBy
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        elif order == 'asc':
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        else:
            products = Product.objects.order_by(sortBy).all()
        
        products = ProductSerializer(products, many=True)

        if products:
            return Response({'products': products.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No hay lista de productos'}, status=status.HTTP_404_NOT_FOUND)

class ListSearchView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
        except:
            return Response({'error': 'Categoria id debe ser un entero'}, status=status.HTTP_404_NOT_FOUND)

        search = data['search']

        if len(search) == 0:
            search_results = Product.objects.order_by('-date_created').all()
        else:
            search_results = Product.objects.filter(
                Q(description__icontains=search) | Q(name__icontains=search)  
            )
        
        if category_id == 0:
            search_results = ProductSerializer(search_results, many=True)
            return Response({'search_products': search_results.data}, status=status.HTTP_200_OK)
        else:
            search_results = Product.objects.filter(category=category_id)
        
        if not Category.objects.filter(id=category_id).exists():
            return Response({'error': 'Categoria no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        
        category = Category.objects.get(id=category_id)

        search_results = ProductSerializer(search_results, many=True)
        return Response({'search_products': search_results.data}, status=status.HTTP_200_OK)

class ListRelatedView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,productId, format = None):
        try:
            product_id = int(productId)
        except:
            return Response({'error': 'El id del producto debe ser un entero'}, status=status.HTTP_404_NOT_FOUND)
        
        #Existe product id

        if not Product.objects.filter(id=product_id).exists():
            return Response({'error': 'El producto con ese id no existe'}, status=status.HTTP_404_NOT_FOUND)
        
        category = Product.objects.get(id=product_id).category
        related_products = Product.objects.filter(category = category)

        related_products = related_products.exclude(id=product_id)
        related_products = ProductSerializer(related_products, many=True)

        if len(related_products.data) > 3:
            return Response({'related_products': related_products.data[:3]}, status=status.HTTP_200_OK)
        elif len(related_products.data) > 0:
            return Response({'related_products': related_products.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron productos relacionados'}, status=status.HTTP_404_NOT_FOUND)

class ListBySearchView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
        except:
            return Response({'error': 'El id de la categoria debe ser un entero'}, status=status.HTTP_404_NOT_FOUND)

        price_range = data['price_range']
        sort_by = data ['sort_by']

        if not (sortBy == 'date_created' or sortBy == 'price' or sortBy == 'name'):
            sortBy = 'date_created'
        
        order = data['order']

        #Si los categoriy.id es iguala  0 filtrar a todas las cotegorias
        if category_id == 0:
            product_results = Product.objects.all()
        elif not Category.objects.filter(id=category_id).exist():
            return Response({'error': 'Esta categoria no existe'}, status=status.HTTP_404_NOT_FOUND)
        else:
            category = Category.objects.get(id=category_id)
            product_results = Product.objects.filter(category=category)
        
        #Filtrar por precio
        if price_range == '20000 - 49000':
            product_results = product_results.filter(price__gte=20000)
            product_results = product_results.filter(price__lt=50000)
        elif price_range == '50000 - 79000':
            product_results = product_results.filter(price__gte=50000)
            product_results = product_results.filter(price__lt=80000)
        elif price_range == '80000 - 150000':
            product_results = product_results.filter(price__gte=50000)
            product_results = product_results.filter(price__lt=80000)
        elif price_range == 'Mas de 150000':
            product_results = product_results.filter(price__gte=150000)

        #Filtrar productos por sortBy
        if order == 'desc':
            sort_by = '-' + sort_by
            product_results = product_results.order_by(sort_by)
        elif order == 'asc':
            product_results = product_results.order_by(sort_by)
        else:
            product_results = product_results.order_by(sort_by)

        product_results = ProductSerializer(product_results, many=True)

        if len(product_results.data) > 0:
            return Response({'related_products': product_results.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron productos'}, status=status.HTTP_404_NOT_FOUND)










        




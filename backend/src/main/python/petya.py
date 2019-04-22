from random import randint
import networkx as nx

######## итератор для перебора подмножеств################

##если нужна поддержка строковых вершин -- заменяем список на словарь или пишем преобразование в функции 
class Iterator:
    def __init__(self, size, is_fixed = False):
        self.size = size
        self.dat = [False for i in range(0, size)]
        if is_fixed:
            self.start = 1
            self.dat[0]=True
        else:
            self.start = 0
        self.not_over = True
        
    def incr(self):
        for i in range(self.start, self.size):
            if self.dat[i]:
                self.dat[i] = False
            else:
                self.dat[i] = True
                return                                
        self.not_over = False
        return 
    
    def is_in_list(self, n):
        if n > self.size:
            return False
        return self.dat[n]
    def prn(self):
        print(self.dat)
    def not_is_over(self):
        return(self.not_over)

def get_graph(graph_eges):
    G=nx.Graph()
#    for edge in graph_eges:
 #       G.add_edge(edge[0],edge[1],weight=edge[2])
    G.add_weighted_edges_from(graph_eges)
    return G

def get_res(G):
    return nx.edges(G)

def get_score(node_list, score):
    s=0
    for i in node_list:
        s+=score[i]
    return s

#########BRUTE##BRUTE##BRUTE##BRUTE##BRUTE##BRUTE##BRUTE##BRUTE##BRUTE##BRUTE##BRUTE##BRUTE##BRUTE##BRUTE##BRUTE######
def optgraph_brute (graph_eges, vertex_score, limit):
    is_fixed = True #обязательна ли вершина с индексом ноль
    G=get_graph(graph_eges)
    
    max_score = 0
    res_size = limit+1
    i = Iterator(nx.number_of_nodes(G), is_fixed)
    node_sublist = []
    node_list = nx.nodes(G)

    while i.not_is_over():
        node_sublist.clear()
        for node in node_list:  #can be raplaced with "in range"
            if i.is_in_list(node):  #вершина должна быть интом, иначе смотри комментарии итератора
                node_sublist.append(node)
        score = get_score(node_sublist, vertex_score) #считать с предыдущим шагом -- минус один проход
        if  score > max_score :                                 
            subG = G.subgraph(node_sublist)
            if nx.is_connected(subG):
                tree = nx.minimum_spanning_tree(subG) #get min tree
                if tree.size(weight='weight') <= limit:
                    res_tree = tree
                    max_score = score
                    res_size = tree.size(weight='weight')
        i.incr()
    
    return get_res(res_tree)#, max_score, res_size
###########################################################################################################

######GREEDY_SHORT_PATH###GREEDY_SHORT_PATH###GREEDY_SHORT_PATH###GREEDY_SHORT_PATH###GREEDY_SHORT_PATH###GREEDY_SHORT_PATH############

#функция расчета рейтинга пути
#модернизировать, потестить разные
def get_path_rate_greedy(path, weight, score): 
    sum_score = get_score(path[1:], score)
    return sum_score/weight

def get_min_path(Node, List, path_weight):
    w = path_weight[Node][0]
    dest = 0
    for i in List:
        #print(i,w)
        if (path_weight[Node][i] < w):
            w = path_weight[Node][i]
            dest = i
    return dest, w

def optgraph_spath_greedy(graph_eges, vertex_score, limit):
    G=get_graph(graph_eges)
    weight_limit = limit
    node_list = list(nx.nodes(G))
    path = dict(nx.all_pairs_dijkstra_path(G, cutoff=None, weight='weight'))
    #словарь словарей. для пары вершин хранит список вершин кратчайшего пути
    
    path_weight = dict(nx.all_pairs_dijkstra_path_length(G, cutoff=None, weight='weight'))
    #словарь словарей. для пары вешин хранит длину пути
    
    path_rate = dict.fromkeys(node_list)

    vacant_nodes = list(node_list)  #подумать над заменой на list на set 
    vacant_nodes.remove(0)
    
    unreachable = []
    selected_nodes = [0]
    total_score = 0 
    weight_left = weight_limit

    #для каждой пары вершин сохраним рейтинг(вкусность) кратчайшего пути
    for i in node_list:
        path_rate[i]=dict.fromkeys(node_list)
        for j in node_list:
            if i != j:
                path_rate[i][j] = get_path_rate_greedy(path[i][j], path_weight[i][j], vertex_score)
            else:
                path_rate[i][j] = 0

    while 1:
        rate = 0
        node = 0 
        dest = 0 
        d = 0
        unreachable = []
        for n in vacant_nodes:
            d, weight = get_min_path(n, selected_nodes, path_weight) #для каждой вершины вакантной берем ближайшую из уже выбранных и длинну
#            if(weight > weight_left): 
#                unreachable.append(n) #если вершина слишком далеко -- удаляем
            if (path_rate[d][n] > rate) and (weight <= weight_left): #выбираем путь с наибольшим рейтингом
                dest = d
                rate = path_rate[n][d]
                node = n
              
#        for n in unreachable:
#            vacant_nodes.remove(n)
        
        if rate == 0:
            #print("limit was reached") 
            break 
            
        selected_path = list(path[node][dest])
        selected_path.remove(dest)    #костыль. научиться добавлять не создавая копию
        #добавить в выбранные и удалить из вакантных все вершины пути
        selected_nodes.extend(selected_path) 
        for i in selected_path:
            vacant_nodes.remove(i)   
            
        #weight_left -= path_weight[node][dest]#добавить пересчет оставшегося веса через минимальное дерево
        tree = nx.minimum_spanning_tree(G.subgraph(selected_nodes))
        weight_left = weight_limit - tree.size(weight='weight')
        
    tree = nx.minimum_spanning_tree(G.subgraph(selected_nodes))
    return get_res(tree) #, get_score(selected_nodes, vertex_score), tree.size(weight='weight'), 
##################################################################################################

#####SIMPLE GREEDY#######SIMPLE GREEDY#######SIMPLE GREEDY#######SIMPLE GREEDY#######SIMPLE GREEDY#######SIMPLE GREEDY####

def optgraph_simple_greedy(graph_eges, vertex_score, limit):
    G=get_graph(graph_eges)
    weight_limit = limit
    node_list = list(nx.nodes(G))
    node_weight = dict.fromkeys(node_list, float('Inf'))
    node_score = dict.fromkeys(node_list, 0)
    
    selected_nodes = {0}
    vacant_nodes = set(nx.all_neighbors(G, 0))
    #print(G[0][1]['weight'])
    for i in nx.all_neighbors(G, 0):
        node_weight[i] = G[0][i]['weight']
        node_score[i] = vertex_score[i]/node_weight[i]
    
    total_score = 0 
    weight_left = weight_limit
    
    while len(vacant_nodes) > 0 :
        best_node = next(iter(vacant_nodes)) #костыль, но нет способа красиво взять один элемент из сета
        for i in vacant_nodes:
            if node_score[best_node] < node_score[i]:
                best_node = i
        
        total_score += vertex_score[best_node]
        weight_limit -= node_weight[best_node]
        
        selected_nodes.add(best_node)
        vacant_nodes.remove(best_node)
        new_nodes = set(nx.all_neighbors(G, best_node))
        new_nodes.difference_update(selected_nodes)
        vacant_nodes.update(new_nodes)

        for i in new_nodes:
            node_weight[i] = min (G[best_node][i]['weight'], node_weight[i])
            node_score[i] = vertex_score[i]/node_weight[i]
       
        unreachable = set()
        for i in vacant_nodes:
            if node_weight[i] > weight_limit:
                unreachable.add(i)
        vacant_nodes.difference_update(unreachable)

    tree = nx.minimum_spanning_tree(G.subgraph(selected_nodes))
    return get_res(tree) #, get_score(selected_nodes, vertex_score), tree.size(weight='weight'), 


############################################################################################################################

######GRASP#####GRASP#####GRASP#####GRASP#####GRASP#####GRASP#####GRASP#####GRASP#####GRASP#####GRASP#####GRASP#####GRASP###
def optgraph_spath_grasp(graph_eges, vertex_score, limit, rep = 10, alpha=0.7):

    G=get_graph(graph_eges)
    weight_limit = limit
    node_list = list(nx.nodes(G))
    path = dict(nx.all_pairs_dijkstra_path(G, cutoff=None, weight='weight'))
    #словарь словарей. для пары вершин хранит список вершин кратчайшего пути
    
    path_weight = dict(nx.all_pairs_dijkstra_path_length(G, cutoff=None, weight='weight'))
    #словарь словарей. для пары вешин хранит длину пути
    
    path_rate = dict.fromkeys(node_list)
    max_res_score = 0

    for i in range(rep):
        vacant_nodes = list(node_list)  #подумать над заменой на list на set 
        vacant_nodes.remove(0)
        
        unreachable = []
        selected_nodes = [0]
        total_score = 0 
        weight_left = weight_limit

        #для каждой пары вершин сохраним рейтинг(вкусность) кратчайшего пути
        for i in node_list:
            path_rate[i]=dict.fromkeys(node_list)
            for j in node_list:
                if i != j:
                    path_rate[i][j] = get_path_rate_greedy(path[i][j], path_weight[i][j], vertex_score)
                else:
                    path_rate[i][j] = 0

        while 1:
            max_rate = 0
            min_rate = float('Inf')
            node = 0 
            dest = 0 
            d = 0
            reachable = []
            cand = []
            for n in vacant_nodes:
                d, weight = get_min_path(n, selected_nodes, path_weight) #для каждой вершины вакантной берем ближайшую из уже выбранных и длинну
                if(weight <= weight_left): 
                    rate = path_rate[d][n]
                    reachable.append((n, d, rate))
                    if (rate > max_rate): 
                        max_rate = rate
                    if (rate < min_rate):
                        min_rate = rate

            if len(reachable) == 0:
                #print("limit was reached") 
                break 

            rate_cut = max_rate - alpha*(max_rate-min_rate)
            for p in reachable:
                if p[2] >= rate_cut:
                    cand.append(p)
            choise = randint(0, len(cand)-1)
            
            node, dest, rate = cand[choise]


            selected_path = list(path[node][dest])
            selected_path.remove(dest)    #костыль. научиться добавлять не создавая копию
            #добавить в выбранные и удалить из вакантных все вершины пути
            selected_nodes.extend(selected_path) 
            for i in selected_path:
                vacant_nodes.remove(i)   
                
            #weight_left -= path_weight[node][dest]#добавить пересчет оставшегося веса через минимальное дерево
            tree = nx.minimum_spanning_tree(G.subgraph(selected_nodes))
            weight_left = weight_limit - tree.size(weight='weight')
        
        tree = nx.minimum_spanning_tree(G.subgraph(selected_nodes))

        res_score = get_score(selected_nodes, vertex_score)
        if  res_score > max_res_score: 
            max_res_score = res_score
            res_tree = tree

    return get_res(tree) #, get_score(selected_nodes, vertex_score), tree.size(weight='weight'), 

############################################################################################################################

#####SIMPLE GRASP######SIMPLE GRASP######SIMPLE GRASP######SIMPLE GRASP######SIMPLE GRASP######SIMPLE GRASP######SIMPLE GRASP#

def optgraph_simple_grasp(graph_eges, vertex_score, limit, rep = 10, alpha = 0.7):
    G=get_graph(graph_eges)
    weight_limit = limit
    node_list = list(nx.nodes(G))
#    node_weight = dict.fromkeys(node_list, float('Inf'))
#    node_score = dict.fromkeys(node_list, 0)
    
    max_res_score = 0
    
    for i in range(rep):
        node_weight = dict.fromkeys(node_list, float('Inf'))
        node_score = dict.fromkeys(node_list, 0)
        selected_nodes = {0}
        vacant_nodes = set(nx.all_neighbors(G, 0))
        #print(G[0][1]['weight'])
        for i in nx.all_neighbors(G, 0):
            node_weight[i] = G[0][i]['weight']
            node_score[i] = vertex_score[i]/node_weight[i]
        
        total_score = 0 
        weight_left = weight_limit
        
        while len(vacant_nodes) > 0 :
            max_rate = -1
            min_rate = float('Inf')
            for i in vacant_nodes:
                rate = node_score[i]
                if rate > max_rate:
                    max_rate = rate
                if (rate < min_rate):
                    min_rate = rate

            cand = []
            rate_cut = max_rate - alpha*(max_rate-min_rate)
            for i in vacant_nodes:
                rate = node_score[i]
                if rate >= rate_cut:
                    cand.append(i)

            choise = randint(0, len(cand)-1)
            sel_node = cand[choise]

            total_score += vertex_score[sel_node]
            weight_left -= node_weight[sel_node]
            
            selected_nodes.add(sel_node)
            vacant_nodes.remove(sel_node)
            new_nodes = set(nx.all_neighbors(G, sel_node))
            new_nodes.difference_update(selected_nodes)
            vacant_nodes.update(new_nodes)

            for i in new_nodes:
                node_weight[i] = min(G[sel_node][i]['weight'], node_weight[i])
                node_score[i] = vertex_score[i]/node_weight[i]
           
            unreachable = set()
            for i in vacant_nodes:
                if node_weight[i] > weight_left:
                    unreachable.add(i)
            vacant_nodes.difference_update(unreachable)

        tree = nx.minimum_spanning_tree(G.subgraph(selected_nodes))

        res_score = get_score(selected_nodes, vertex_score)
        if  res_score > max_res_score: 
            max_res_score = res_score
            res_tree = tree

    return get_res(tree) #, get_score(selected_nodes, vertex_score), tree.size(weight='weight'), 

########################################################################################################################################################33